const DataStore = require("nedb-promise");
const products = new DataStore({
    filename: "./db/products.db",
    autoload: true
});

// import product file for inserting to db products.db. JUST RUN ONCE OR YOUR PRODUCTS.DB WILL BE FULL OF THE SAME ITEMS.

// const productsObject = require('../products.json')
// products.insert(productsObject)


module.exports = {
    async all() {
        return await products.find({});
    },

    async getOne(id) {
        return await products.findOne({ _id: id });
    },

    async create(body) {
        const newProduct = {
            _id: body.id,
            serial: body.serial,
            title: body.title,
            price: body.price,
            shortDesc: body.shortDesc,
            longDesc: body.longDesc,
            imgFile: body.imgFile
        };
        return await products.insert(newProduct);
    },

    async delete(id) {
        return await products.remove({ _id: id });
    },

    async update(id, body) {
        let product = await products.findOne({ _id: id }, { $set: body });
        product = await products.update(product, { $set: body });
        return product;
    }
};