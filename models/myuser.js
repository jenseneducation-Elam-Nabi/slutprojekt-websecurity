const DataStore = require("nedb-promise");
const users = new DataStore({ filename: "./db/users.db", autoload: true })
const bcrypt = require("bcryptjs");

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
