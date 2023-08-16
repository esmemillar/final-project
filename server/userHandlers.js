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

    console.log("req.body" + req.body)
    const userDetails = req.body;

    // UPDATE TO KEY PASSED FROM CHECKOUT

    // compiles order checkout information with cart and submits to order collection
    const user = {
        _id: uuidv4(),
        user: userDetails
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

const login = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproj");

    const {email} = req.body;
    console.log(email);


    // UPDATE TO KEY PASSED FROM CHECKOUT

    // compiles order checkout information with cart and submits to order collection
    const user = {
        _id: uuidv4(),
        user: email
    };
    
    try {
    
        const result = await db.collection("users").findOne({"user.email": email})
        let userId = result._id;
        console.log(result);
        console.log(userId);

        if (result._id !== null) {
            return res.status(200).json({
                status: 200,
                message: "Logged in.",
                data: userId,
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. " + err.message + " Please try again."
        })
    }

}

// const getUsers = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);

//     try {
//         client.connect();

//         const db = client.db('finalproj');

//         const data = db.collection('users').find().toArray();

//         res.status(200).json({
//             status: 200,
//             data: data
//         })

//     } catch(err) {
//         console.log(err);
//         res.status(404).json({
//             status: 404,
//             message: 'not users found'
//         })
//     }

//     client.close();
// };

// const getUser = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);
//     const userId = Number(req.params.userId);

//     try {
//         client.connect();

//         const db = client.db('finalproj');

//         const data = db.collection('users').findOne({_id: userId });

//         if (data === null){
//             throw new Error();
//         }

//         res.status(200).json({
//             status: 200,
//             data: data
//         })

//     } catch(err) {
//         console.log(err);
//         res.status(404).json({
//             status: 404,
//             message: 'user not found'
//         })
//     }

//     client.close();

// };


module.exports = {
    createUser, 
    login
    // getUsers
    // getUser
}