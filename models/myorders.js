const DataStore = require("nedb-promise"); // to be able to use the DB we have to import the NEDB package
const orders = new DataStore({ filename: "./db/orders.db", autoload: true });
const users = new DataStore({ filename: "./db/users.db", autoload: true });

module.exports = {

    // find all orders in db.
    async getMyOrders() {
        return await orders.find({});
    },

    // find one order in DB
    async getOneOrder(userID) {
        return await orders.find({ owner: userID });
    },

    // create new order
    async create(body, userID) {
        // new order object



        const newOrder = {
            owner: userID,
            timeStamp: Date.now(),
            status: "inProcess",
            items: body.items,
            orderValue: price
        };
        // insert new order in db.
        const myNewOrder = await orders.insert(newOrder);

        /* We are updating the user and then "push"($push)
         the orderhistory inside the empty array inside the users.db, so whoever makes one order,
         we will be able to see the orders. */
        await users.update({
            _id: userID
        }, {
            $push: {
                orderHistory: myNewOrder._id,
                orderValue: myNewOrder.price
            }
        });
    }
};
