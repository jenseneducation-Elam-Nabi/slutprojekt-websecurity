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
async function create(content) {
    return await db.insert({ content });
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