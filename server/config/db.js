const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.DB_URL, {})
    .then(()=> console.log("Connection to the DB started"))
    .catch((err)=> {
        console.log("DB connection failed")
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = connectDB;