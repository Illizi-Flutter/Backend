const categorieM = require("../models/categorie");
module.exports = {
    getAll: async(req, res) => {
        await categorieM.find()
            .then(docs => {
                res.status(200).json({ message: 'affichage categorie!', data: docs })
            })
            .catch(err => {
                res.status(500).json({ message: err, data: null })
            });
    },
    addCat: async(req, res) => {
        const categorie = new categorieM(req.body);
        await categorie.save(req.body)
            .then(docs => {
                res.status(200).json({ message: 'ajout categorie!', data: docs })
            })
            .catch(err => {
                res.status(500).json({ message: err, data: null })
            });
    },
    updateCat: async(req, res) => {
        await categorieM.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(docs => {
                res.status(200).json({ status: '200', message: 'update successful!', data: docs });
            }).catch(err => {
                res.status(500).json({ status: '400', message: err, data: null })
            });
    },
    deleteCat: async(req, res) => {
        await categorieM.findByIdAndDelete(req.params.id).then(docs => {
            res.status(200).json({ status: '200', message: 'delete successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },
    getProdById: async(req, res) => {
        await categorieM.findById(req.params.id).then(docs => {
            res.status(200).json({ status: '200', message: 'affichage successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ status: '400', message: err, data: null })
        });
    },

}