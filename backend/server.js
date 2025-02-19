// const express = require('express');
// const colors = require('colors');
// const dotenv = require('dotenv');
// const morgan = require('morgan');
// const cors = require('cors');
// const connectDtatabase = require('./db/connectDataBase.js');
// const path = require("path");
// dotenv.config();

// const app = express();

// // Serve static frontend files
// app.use(express.static(path.join(__dirname, "./client/build")));

// const frontendURL = "https://new-blood-bank-nw9a.vercel.app";

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


// // Middleware for logging requests
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors({
//     origin: frontendURL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

// connectDtatabase();

// const PORT = process.env.PORT || 8080;

// app.use('/api/v1/auth', require("./routes/authRoutes.js"));
// app.use('/api/v1/inventory', require("./routes/inventoryRoutes.js"));
// app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
// app.use("/api/v1/admin", require("./routes/adminRoutes.js"));
// app.listen(PORT, () => {
//     console.log(`Server is running in ${process.env.DEV_MODE} on port ${process.env.PORT}`
//         .bgBlue.white
//     );

// })

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDatabase = require("./db/connectDataBase.js");

dotenv.config();
const app = express();

// ✅ Load CORS First
const frontendURL = "https://new-blood-bank-nw9a.vercel.app";
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.endsWith(".vercel.app")) {
            callback(null, true);  // ✅ Allow all Vercel subdomains
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

// ✅ Middleware for JSON & Logging
app.use(express.json());
app.use(morgan("dev"));

// ✅ Connect Database
connectDatabase();

// ✅ Define API Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Blood Bank API!");
});

app.use("/api/v1/auth", require("./routes/authRoutes.js"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes.js"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));



// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.DEV_MODE} on port ${PORT}`.bgBlue.white
    );
});
