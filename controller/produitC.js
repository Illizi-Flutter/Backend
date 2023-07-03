const produitM = require("../models/produit");
module.exports = {
    getAll: async(req, res) => {
        await produitM.find({}).then(docs => {
            res.status(200).json({ status: '200', message: 'affichage successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },

    addProd: async(req, res) => {
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
    }
}