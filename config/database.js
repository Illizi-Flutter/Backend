const mongoose = require("mongoose");
const { error, success } = require('consola');
require("dotenv").config();
db_url = process.env.db_url;

mongoose.connect(db_url).then(() => {
    console.log("connected successfully");
}).catch(err => {
    console.log(err);
})