const { ObjectId } = require("mongodb");
const MongoClientConnection = require("../config/connection");
const validateInput = require("../helpers/validateInput");
const bcrypt = require('bcryptjs')

class Controller {
    static async getUser(req, res, next) {
        try {
            const { userCollection } = MongoClientConnection
            const users = await userCollection.find({}, { projection: { password: 0 } }).toArray();
            res.status(200).json(users)
        }
        catch (error) {
            next(error)
        }
    }

    static async createUser(req, res, next) {
        try {
            const { userCollection } = MongoClientConnection
            let { username, email, password, phoneNumber, address } = req.body
            await validateInput({ username, email, password })
            password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const role = "Admin"
            const user = await userCollection.insertOne({ username, email, password, phoneNumber, address, role });
            res.status(201).json(user)
        }
        catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { userCollection } = MongoClientConnection
            const userId = req.params.userId
            const _id = new ObjectId(userId)
            const user = await userCollection.findOne({ _id }, { projection: { password: 0 } })
            if (!user) throw { status: 404, msg: "User not found!" }
            res.status(200).json(user)
        }
        catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { userCollection } = MongoClientConnection
            const userId = req.params.userId
            const _id = new ObjectId(userId)
            const user = await userCollection.deleteOne({ _id });
            if (user.deletedCount == 0) throw { status: 404, msg: "User not found!" }
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
        }
    }
}


module.exports = Controller
