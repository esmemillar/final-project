"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

// Options for mongoDB client
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};



const getAllWines = async (req, res) => {
    console.log('hello');
    const client = new MongoClient(MONGO_URI, options);

    try {
        client.connect();

        const db = client.db('finalproj');

        const data = await db.collection('wines').find().toArray();
        // const data = db.collection('wines').findOne({_id: 111 });

        res.status(200).json({
            status: 200,
            data: data
        });

    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data not found' 
        })
    }

    client.close();
};

const getAllProducers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        client.connect();

        const db = client.db('finalproj');

        const data = await db.collection('producers').find().toArray();

        res.status(200).json({
            status: 200,
            data: data
        });

    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data not found' 
        })
    }

    client.close();
};

const getByName = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        client.connect();

        const db = client.db('finalproj');

        const producers = await db.collection('producers').findOne({name: searchName });
        const wines = await db.collection('wines').findOne({name: searchName });

        if (producers || wines === null){
            throw new Error();
        }

        res.status(200).json({
            status: 200,
            data: producers && wines,
        });

    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data not found' 
        })
    }

    client.close();
};

module.exports = { 
    getAllWines,
    getAllProducers, 
    getByName
 };