const DataStore = require("nedb-promise");

const orders = new DataStore({
    filename: "./db/orders.db",
    autoload: true
});

module.exports = {

    // find all orders in db.
    async getMyOrders() {
        return await orders.find({});
    },

    // create new order 
    async create(body) {
        // new order object
        const newOrder = {
            _id: body.id,
            timeStamp: Date.now(),
            status: "inProcess",
            items: body.items,
            orderValue: body.orderValue
        };

        // insert new order in db.
        return await orders.insert(newOrder);
    }
};



