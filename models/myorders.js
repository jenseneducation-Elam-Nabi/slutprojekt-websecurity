const DataStore = require("nedb-promise");

const order = new DataStore({
    filename: "./db/orders.db",
    autoload: true
});

// GET ALL
async function all() {
    return await order.find({ role: "admin" }, (err, doc) => {
        if (err) return false
        console.log(doc)
    });
};

//Create POST
async function create(content) {
    return await order.insert({ content });
};

module.exports = { all, create };