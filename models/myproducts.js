const DataStore = require("nedb-promise");

const products = new DataStore({
    filename: "./db/products.db",
    autoload: true
});

// const productsObject = require('../products.json')
// db.insert(productsObject)

// GET ALL
async function all() {
    return await products.find({});
};

async function getOne(id) {
    return await products.findOne({ _id: id })
}

//Create POST
async function create(body) {
    const newProduct = {
        _id: body.id,
        serial: body.serial,
        title: body.title,
        price: body.price,
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        imgFile: body.imgFile
    }
    return await products.insert(newProduct)
};

// Delete POST 
async function remove(id) {
    return await db.remove({ _id: id });
};

//Patch(UPDATE POST)
async function update(id, body) {
    return await db.update({ _id: id }, body);
};

module.exports = { all, getOne, create, update, remove };