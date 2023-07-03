const mongoose = require("mongoose");

const categorieSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('categorie', categorieSchema);