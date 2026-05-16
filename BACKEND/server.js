const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const connectDB = require("./config/connectionDB");
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: "https://ruchikootu.onrender.com"
}));
app.use(express.json());
// Serve static images
app.use('/images', express.static('public/images'));
app.use("/", require('./routes/user'));
app.use("/recipe", require('./routes/recipe'));
connectDB();


app.listen(PORT, (err) => {
    console.log(`App is listening on port ${PORT}`);
})