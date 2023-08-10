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


const getFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        client.connect();

        const db = client.db('finalproj');

        const data = await db.collection('favorites').find().toArray();

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


const createFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    const favoriteWines = req.body; // List of all favorites
    const favorites = {
        _id: uuidv4(),
        favorites: favoritesWines
    };

    try {
        client.connect();

        const db = client.db('finalproj');

        const result = await db.collection('favorites').insertOne(favorites);

        // Return faves upon successful request
        if (result.acknowledged === true) {
            return res.status(200).json({
                status: 200,
                message: "Favorites created!",
                data: cart
            })
        };

    } catch (err) {
        console.log(err);
        res.status(400).json({status: 400, message: err.message})
    }

    client.close();

};


const updateFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    const favoritesId = req.params.favoritesId;
    const favoriteWines = req.body;

    try {
        client.connect();

        const db = client.db('finalproj');

        const data = await db.collection('favorites').updateOne(
            {
                "_id": favoritesId
            },
            {
                '$set': {
                    "favorites.$[favorites]": {...favoriteWines}
                }
            },
            {
                "arrayFilters": [
                    {
                        "favorites._id": favoriteWines._id
                    }
                ]
            }
        );

        if (data.modifiedCount >= 1){
            res.status(200).json({status: 200, messsage: 'favorites updated.'})
        }

    } catch (err){
        res.status(404).json({status: 404, message: err.message})
    }

    client.close();
};


const deleteFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    const favoritesId = req.params.favoritesId;
    console.log(favoritesId)

    try {
        client.connect();

        const db = client.db('finalproj');

        const data = db.collection('favorites').findOneAndDelete({ _id: favoritesId })
        console.log(data)
        
        if (data.deletedCount === 0) {
            return res.status(404).json({
                status: 404,
                message: "favorites ID could not be found...",
                data: favoritesId,
            })
        } else {
            return res.status(200).json({
                status: 200,
                message: "Favorite removed.",
                data: favoritesId,
            })
        }

    } catch (err) {
        res.status(404).json({status: 404, message: err.message})
    }
    
    client.close();

};

module.exports = {
    getFavorites,
    createFavorites,
    updateFavorites,
    deleteFavorites
}