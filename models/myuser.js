const DataStore = require("nedb-promise");
const bcrypt = require("bcryptjs");

const users = new DataStore({
    filename: "./db/users.db",
    autoload: true
});

module.exports = {
    async newRegister(body) {
        const myNewUser = {
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            name: body.name,
            adress: {
                street: body.adress.street,
                zip: body.adress.zip,
                city: body.adress.city
            }
        }
        return await users.insert(myNewUser);
    }
};
