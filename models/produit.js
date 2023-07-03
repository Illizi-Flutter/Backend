const mongoose = require("mongoose");
const { schema } = require("./categorie");

const produitSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
    },
    etat: {
        type: String,
        enum: ['Occasion', 'Fonctionnel', 'Neuve', 'Lots', 'Bon etat', 'Excellent etat', 'Mauvaise etat'],
        required: true,
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorie',
    }
})

module.exports = mongoose.model('produit', produitSchema);