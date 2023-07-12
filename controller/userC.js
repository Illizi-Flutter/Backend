const bcrypt = require("bcryptjs/dist/bcrypt");
const userM = require("../models/user");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

module.exports = {

    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            const user = await userM.findOne({ email: email });

            if (user && (await bcrypt.compareSync(password, user.password))) {
                const token = jwt.sign({ user_id: user._id, email },
                    process.env.secret_token, {
                        expiresIn: "2h",
                    }
                );
                user.token = token;
                res.status(200).json({ status: '200', message: 'insert successful!', user, token });
            } else
                res.status(400).json({ status: '400', message: 'Invalid Credentials!' });
        } catch (err) {
            console.log(err);
        }
    },
    register: async(req, res) => {
        req.body.password = await bcrypt.hashSync(req.body.password)

        var user = new userM(req.body);
        user.resetCode = 0;

        await user.save(req.body).then(docs => {
            res.status(200).json({ status: '200', message: 'insert successful!', user: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });

    },
    changePassword: async(req, res) => {
        const { email, password, confirmPassword, oldPassword } = req.body;

        const user = await userM.findOne({ email: email });

        if (user && bcrypt.compareSync(oldPassword, user.password)) {
            if (password === confirmPassword) {

                user.password = await bcrypt.hashSync(password);
                await user.save();
                res.status(200).json({ response: "updated", data: req.body });
            } else
                res.status(200).json({ response: "passwords don't match" });



        } else
            res.status(500).json({ message: "email or password don't match" })
    },
    getUsers: async(req, res) => {
        await userM.find().then(docs => {
            res.status(200).json({ status: '200', message: 'affichage successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },
    async sendActivationCode(req, res) {
        const user = req.user;
        try {
            const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.PASSWORD_EMAIL
                },
            });
            await transporter.sendMail({
                from: process.env.SENDER_EMAIL,
                to: req.body.email,
                subject: "Your Activation Code ✔",
                text: resetCode,
            });

            var code = { resetCode: resetCode };
            var email = { email: req.body.email };

            userM.updateOne(email, code).then(docs => {
                res.status(200).json({ email: req.body.email, resetCode });
            });
        } catch (error) {
            res.status(400).json({
                error: error
            });
        }
    },
    async verifyCode(req, res) {
        const { resetCode, email } = req.body;
        const user = await userM.findOne({ email: email });

        if (resetCode === user.resetCode) {
            res.status(200).json({ status: '200', message: 'true', });
        } else
            res.status(200).json({ status: '400', message: 'false' });
    },
    forgotPassword: async(req, res) => {

        const { email, newPassword, confirmPassword } = req.body;
        const user = await userM.findOne({ email: email });

        if (newPassword === confirmPassword) {
            var pass = await bcrypt.hashSync(req.body.newPassword);

            var password = { password: pass };
            userM.updateOne(user, password)
                .then(docs => {
                    res.status(200).json({ status: '200', message: 'update successful!', data: req.body });
                })
                .catch(err => {
                    res.status(500).json({ status: '400', message: err, data: null })
                });
        } else
            res.status(500).json({ message: "2 passwords don't match" })
    },

}