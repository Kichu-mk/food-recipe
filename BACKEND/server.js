const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require("./config/connectionDB");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/recipe", require('./routes/recipe'));
connectDB();


app.listen(PORT, (err) => {
    console.log(`App is listening on port ${PORT}`);
})