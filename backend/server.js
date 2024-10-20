const express = require("express");
const cors = require("cors");
const connectDB = require('./config/mongodb.js');
const connectCloudinary = require('./config/cloudinary.js');
require('dotenv').config();

//Add Routes
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/user", userRoutes );
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)


app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => console.log(`Server listening on localhost:${port}`))