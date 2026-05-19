const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const complaintRoutes = require("./routes/complaintRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/api/complaints", complaintRoutes);

app.use("/api/auth", authRoutes);


// Default Route
app.get("/", (req, res) => {

    res.send("API is running...");

});


// Port
const PORT = process.env.PORT || 5000;


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

    app.listen(PORT, () => {

        console.log(`Server running on port ${PORT}`);

    });

})

.catch((err) => {

    console.log(err);

});