const DataStore = require("nedb-promise");

const orders = new DataStore({
    filename: "./db/orders.db",
    autoload: true
});

const users = new DataStore({
    filename: "../db/users.db"
});

module.exports = {

    // find all orders in db.
    async getMyOrders() {
        return await orders.find({});
    },


    async getOneOrder() {
        return await orders.findOne({});
    },

    // create new order 
    async create(body) {
        // new order object
        const newOrder = {
            timeStamp: Date.now(),
            status: "inProcess",
            items: body.items,
            orderValue: body.orderValue
        };

        // insert new order in db.
        const myNewOrder = await orders.insert(newOrder);
        //
        await users.update({ _id: {} }, { $push: { orderHistory: myNewOrder._id } });

    }
};



