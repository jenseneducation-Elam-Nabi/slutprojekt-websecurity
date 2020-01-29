const DataStore = require("nedb-promise");
const users = new DataStore({ filename: "./db/users.db", autoload: true })
const bcrypt = require("bcryptjs");

module.exports = {
    async newRegister(body) {
        if (body.password === body.repeatPassword) {
            const user = await users.findOne({ email: body.email })
            if (user) {
                return false;
            } else {
                const passwordHash = await bcrypt.hash(body.password, 10)
                const myNewUser = {
                    email: body.email,
                    password: passwordHash,
                    name: body.name,
                    adress: {
                        street: body.adress.street,
                        zip: body.adress.zip,
                        city: body.adress.city
                    }
                };
                return await users.insert(myNewUser);
            }
        } else {
            return false;
        }
    }
};
