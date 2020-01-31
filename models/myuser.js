const DataStore = require("nedb-promise");
const users = new DataStore({ filename: "./db/users.db", autoload: true })
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()


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
                    role: "costumer",
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
    },

    async userLogin(body) {
        const user = await users.findOne({});
        if (user.email !== body.email) {
            return false
        } else {
            const passwordMatch = await bcrypt.compare(body.password, user.password)
            if (passwordMatch) {
                const payload = {
                    token: "JWT_TOKEN",
                    user: {
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        adress: {
                            street: user.adress.street,
                            city: user.adress.city,
                            zip: user.adress.zip
                        }
                    }
                }
                const secret = process.env.MYPASS
                return jwt.sign(payload, secret)
            } else {
                return false
            }
        }
    }
};

