const DataStore = require("nedb-promise");

const db = new DataStore({
    filename: "./db/products.db",
    autoload: true
});

// GET ALL
async function all() {
    return await db.find({});
};

//Create POST
async function create(db) {
    return await db.insert({
        title: 'Gretas Fury',
        price: 999,
        shortDesc: 'Unisex',
        longDesc: 'Skate ipsum dolor sit amet...',
        imgFile: 'skateboard-greta.png'
    });
};

// Delete POST 
async function remove(id) {
    return await db.remove({ _id: id });
};

//Patch(UPDATE POST)
async function update(id, content) {
    return await db.update({ _id: id });
};

module.exports = { all, create, update, remove };