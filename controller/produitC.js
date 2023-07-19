const produitM = require("../models/produit");
const userM = require("../models/user");
module.exports = {
    getAll: async(req, res) => {
        await produitM.find({}).then(docs => {
            res.status(200).json({ status: '200', message: 'affichage successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },

    addProd: async(req, res) => {

        req.body["image"] = !req.file ? null : req.file.filename;

        const produit = new produitM(req.body);
        await produit.save(req.body).then(docs => {
            res.status(200).json({ status: '200', message: 'insert successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },
    getProdById: async(req, res) => {
        await produitM.findById(req.params.id).then(docs => {
            res.status(200).json({ status: '200', message: 'affichage successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },
    updateProd: async(req, res) => {
        await produitM.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(docs => {
                res.status(200).json({ status: '200', message: 'update successful!', data: docs });
            }).catch(err => {
                res.status(500).json({ status: '400', message: err, data: null })
            });
    },
    deleteProd: async(req, res) => {
        await produitM.findByIdAndDelete(req.params.id).then(docs => {
            res.status(200).json({ status: '200', message: 'delete successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },
    getProductByUserId: async(req, res) => {
        let prodList = [];
        try {

            let products = await produitM.find({ isEnabled: true });
            for (const prod of products) {
                if (prod.numberOfItems != 0) {

                    let shop = await userM.find({ _id: prod.user_id })
                    if (shop.length != 0) {
                        const productJson = {
                            nom: prod.nom,
                            prix: prod.prix,
                            quantity: prod.quantity,
                            username: shop[0].username,
                            imageUser: shop[0].image,
                            imageProd: prod.image,
                        }
                        prodList.push(productJson);
                    }
                }

            }
            res.status(200).json({ status: '200', message: 'affichage successful!', data: prodList });
        } catch (error) {
            throw error;
        }
    }
}