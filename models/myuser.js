const DataStore = require("nedb-promise");
const users = new DataStore({ filename: "./db/users.db", autoload: true })
const bcrypt = require("bcryptjs"); // To be able to HASH passwords
const jwt = require("jsonwebtoken"); // use jsonwebtoken to verify the user that is logged!


/* to be able to use .env file and store secret data,
you will have to require the dotenv packge.*/
require('dotenv').config();


module.exports = {
    // Create async function that takes 1 parameter, "body"
    async newRegister(body) {

        // check if password match repeat password 
        if (body.password === body.repeatPassword) {

            // check if email provided matches email stored in db
            const user = await users.findOne({ email: body.email })

            // if true, return false (we dont want to have 2 users with the same email)
            if (user) {
                return false;
            } else {

                // hash password provided with bcrypt.hash -- salt 10
                const passwordHash = await bcrypt.hash(body.password, 10)

                // create object/user
                const myNewUser = {
                    email: body.email,
                    password: passwordHash,
                    role: "costumer",
                    name: body.name,
                    adress: {
                        street: body.adress.street,
                        zip: body.adress.zip,
                        city: body.adress.city
                    },
                    //where the orderhistory will be put, an empty array.
                    orderHistory: []
                };

                // insert object "newUser" into db using db-name.insert(myNewUser)
                return await users.insert(myNewUser);
            }
        } else {

            // if password doesn't match repeat password, return false
            return false;
        }
    },

    // create function to authenticate user when logging in.
    // Function take 1 parameter, "body"
    async userLogin(body) {
        // check if there is an email in db that matches email provided
        const user = await users.findOne({ email: body.email });
        // if there is no match, return false
        if (!user) {
            return false;
        } else {
            // Use bcrypt.compare to hash hashed password with provided(entered password) password
            const passwordMatch = await bcrypt.compare(body.password, user.password);
            // if de-hashing was successful, continue with login 
            if (passwordMatch) {
                // We put our secret in the variable called mysecret.
                const mysecret = process.env.MYPASS;
                // create a payload for creating jwt(jut)
                // no private information in payload such as password, creditcard details etc
                const payload = {
                    userID: user._id,
                    role: user.role,
                }
                // create a token with jwt.sign that takes 2 parameters, payload and secret key.
                const token = jwt.sign(payload, mysecret)
                // return token
                return {
                    token: token,
                    user: {
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        adress: {
                            street: user.adress.street,
                            city: user.adress.city,
                            zip: user.adress.zip
                        },
                        orderHistory: user.orderHistory
                    }
                };
            } else {
                // if password de-hashing wasn't successful, return false
                return false;
            }
        }
    }
};