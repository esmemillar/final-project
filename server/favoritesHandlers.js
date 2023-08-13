"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

// Options for mongoDB client
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// TO DO : update to find SPECIFIC USER by ID and return array of associated favorites

const getFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        client.connect();

        const db = client.db('finalproj');

        const data = await db.collection('users').find().toArray();

        if (data === null){
            throw new Error();
        }

        res.status(200).json({status: 200, data: data});

    } catch(err) {
        console.log(err);
        res.status(404).json({status: 404, message: err.message});
    }

    client.close();
};


const addFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);


    try {
        client.connect();

        const db = client.db('finalproj');
        console.log("connected");

        const _id = user._id

        const findUser = await db.collection("users").findOne({ _id })

        const updateFavorites = await db.collection("users").updateOne({favorites: user.favorites});

        if (findUser != undefined) {
            res.status(200).json({ status: 200, message: "Your favorites have been updated!", data: updateFavorites })
        } else {
            res.status(500).json({ status: 500, message: "That didn't work!", data: "" });
        }


    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: "something went wrong" });
    } finally {
        client.close();
        console.log("disconnected!");
    }

};


// TO DO: add remove from favorites feature - find user by ID and remove wine by ID

// const removeFavorite = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);

//     const favoritesId = req.params.favoritesId;
//     console.log(favoritesId)

//     try {
//         client.connect();

//         const db = client.db('finalproj');

//         const data = db.collection('favorites').findOneAndDelete({ _id: favoritesId })
//         console.log(data)
        
//         if (data.deletedCount === 0) {
//             return res.status(404).json({
//                 status: 404,
//                 message: "favorites ID could not be found...",
//                 data: favoritesId,
//             })
//         } else {
//             return res.status(200).json({
//                 status: 200,
//                 message: "Favorite removed.",
//                 data: favoritesId,
//             })
//         }

//     } catch (err) {
//         res.status(404).json({status: 404, message: err.message})
//     }
    
//     client.close();

// };

module.exports = {
    getFavorites,
    addFavorites
    // removeFavorite
}