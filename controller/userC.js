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
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ user_id: user._id, email },
                    process.env.secret_token, {
                        expiresIn: "2h",
                    }
                );
                user.token = token;
                res.status(200).json({ user, token });
            }
            res.status(400).send("Invalid Credentials");
        } catch (err) {
            console.log(err);
        }
    },
    register: async(req, res) => {
        req.body.password = await bcrypt.hashSync(req.body.password)
        const user = new userM(req.body);

        await user.save(req.body).then(docs => {
            res.status(200).json({ status: '200', message: 'insert successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });

    },
    changePassword: async(req, res) => {
        const { email, newPassword, confirmPassword, oldPassword } = req.body;

        const user = await userM.findOne({ email: email });

        if (user && bcrypt.compareSync(oldPassword, user.password)) {
            if (newPassword === confirmPassword) {

                user.password = await bcrypt.hashSync(newPassword);
                await user.save();
                res.status(200).json({ response: "updated" });
            } else
                res.status(200).json({ response: "passwords don't match" });



        } else
            res.status(500).json({ message: "email or password don't match" })
    },
    forgotPassword: async(req, res) => {

        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        const user = await userM.findOne({ email: req.body.email });


        if (user && newPassword === confirmPassword) {
            req.body.password = await bcrypt.hashSync(req.body.newPassword)

            await userM.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then(docs => {
                    res.status(200).json({ status: '200', message: 'update successful!', data: docs });
                }).catch(err => {
                    res.status(500).json({ status: '400', message: err, data: null })
                });
        } else
            res.status(500).json({ message: "2 passwords don't match" })


    },
    sendActivation: async(req, res) => {

        const resetCode = Math.floor(1000 + Math.random() * 9000).toString();

        console.log(resetCode);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.PASSWORD_EMAIL
            },
        });

        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: req.body.email,
            subject: "Your Activation Code ✔",
            text: resetCode,
        }).then(info => {
            console.log({ info });
        }).catch(console.error);

    },
    getUsers: async(req, res) => {
        await userM.find().then(docs => {
            res.status(200).json({ status: '200', message: 'affichage successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },

}