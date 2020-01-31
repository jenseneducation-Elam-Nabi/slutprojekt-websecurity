const DataStore = require("nedb-promise");

const db = new DataStore({
    filename: "./db/products.db",
    autoload: true
});

// const productsObject = require('../products.json')
// db.insert(productsObject)

// GET ALL
async function all() {
    return await db.find({});
};

//Create POST
async function create(db) {
    return await db.insert({
        title: body.title,
        price: body.price,
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        imgFile: body.imgFile
    });
};

// Delete POST 
async function remove(id) {
    return await db.remove({ _id: id });
};

//Patch(UPDATE POST)
async function update(id, content) {
    return await db.update({ _id: id }, content);
};

module.exports = { all, create, update, remove };