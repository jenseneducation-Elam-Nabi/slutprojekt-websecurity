const DataStore = require("nedb-promise");

const products = new DataStore({
    filename: "./db/products.db",
    autoload: true
});

// import product file for inserting to db products.db.

// const productsObject = require('../products.json')
// products.insert(productsObject)

// GET ALL PRODUCTS

// create async function to find all products in db.
async function all() {
    return await products.find({});
};

//GET ONE "PRODUCT"
async function getOne(id) {
    return await products.findOne({ _id: id });
};

//Create PRODUCT
// function takes 1 parameter, "body"
async function create(body) {
    // create new object where all keys get value from product form.
    const newProduct = {
        _id: body.id,
        serial: body.serial,
        title: body.title,
        price: body.price,
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        imgFile: body.imgFile
    }
    // insert object into db.
    return await products.insert(newProduct);
};

// Delete PRODUCT 
async function remove(id) {
    return await products.remove({ _id: id });
};

//Patch(UPDATE PRODUCT)
async function update(id, body) {
    let product = await products.findOne({ _id: id })
    product = await products.update(product, { $set: body });
    return product;
};

// export every function through module.exports so it can be used elsewhere e.g in the routes folder.
module.exports = { all, getOne, create, update, remove };