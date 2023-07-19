const express = require('express');
const fs = require('fs');
const db = require("./config/database.js");
const dotenv = require("dotenv").config();
const produitR = require('./routes/produitR.js');
const categorieC = require('./routes/categorieR.js');
const userC = require('./routes/userR.js');
const cors = require('cors');

domain = process.env.domain;
const app = express();
app.use(express.json());

const hostname = '127.0.0.1'; // L'@ du serveur

const port = process.env.PORT || 9090; // Le port du serveur
app.use(cors());

app.use(cors({
    origin: ['http://localhost:64404'],
}));
app.use('/images', express.static('images'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.use('/produit', produitR);
app.use('/categorie', categorieC);
app.use('/user', userC);


app.listen(port, hostname, () => {
    console.log(`Server running at ${domain}${port}/`);
});