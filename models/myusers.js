const DataStore = require("nedb-promise");

const users = new DataStore({
    filename: "./db/users.db",
    autoload: true
});

async function newRegister(body) {
    const myNewUser = {
        email: body.email,
        password: body.password,
        name: name.body,
        adress: {
            street: body.adress.street,
            zip: body.adress.zip,
            city: body.adress.city
        }
    }
    return await users.insert({ myNewUser });
}

module.exports = { newRegister };