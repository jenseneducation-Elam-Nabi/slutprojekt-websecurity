const express = require('express');

//IMPORT 
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());

// EXECUTE
app.use(express.static('public'));
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/", userRoutes);

app.listen(8080, () => console.log("Server started"));
