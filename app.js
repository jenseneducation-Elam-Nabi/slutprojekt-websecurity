const express = require('express')
const productRoutes = require("./routes/resources/products");
const orderRoutes = require("./routes/resources/orders");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(8080, () => console.log("Server started"))
