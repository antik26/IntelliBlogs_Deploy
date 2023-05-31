const express = require("express"); // Importing express
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

// env config
dotenv.config()

// router import
const userRoutes = require(`./routes/userRoutes`)
const blogRoutes = require(`./routes/blogRoutes`)


//mongodbconnection
connectDB();

// rest object
const app = express();

//middle wares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')))

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// rest api

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});
//port
const PORT = process.env.PORT || 8080;


// listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
            .white
    );
});