const MongoClientConnection = require("../config/connection")

module.exports = async (input) => {
    const { db } = MongoClientConnection
    for (const key in input) {
        if (!input[key]) {
            throw { status: 400, msg: 'Invalid input' }
        }
        if (key == "password" && input.password.length < 5) {
            throw { status: 400, msg: 'password must be at least 5 characters' }
        }
        if (key == "email") {
            const user = await db.collection("Users").findOne({ email: input.email })
            if (user) throw { status: 400, msg: 'Email already Registered' }
        }
    }
}

