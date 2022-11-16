const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoute = require("./src/routes/UserRoute");

const app = express();
connectDB();
app.use(cors());

app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/api/", userRoute);
// app.use("/api/", teacherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is running on Port 5000");
});