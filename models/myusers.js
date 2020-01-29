const DataStore = require("nedb-promise");

const db = new DataStore({
    filename: "./db/users.db",
    autoload: true
});

module.exports = {

}