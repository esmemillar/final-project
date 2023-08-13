const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproj");

    const userDetails = req.body;

    // UPDATE TO KEY PASSED FROM CHECKOUT

    // compiles order checkout information with cart and submits to order collection
    const user = {
        _id: uuidv4(),
        user: userDetails, 
        favorites: []
    };
    
    try {
    
        const result = await db.collection("users").insertOne(user)

        if (result.acknowledged === true) {
            return res.status(200).json({
                status: 200,
                message: "Account created.",
                data: user,
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. " + err.message + " Please try again.",
            data: order,
        })
    }




}

module.exports = {
    createUser
}