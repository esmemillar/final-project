const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(require('./routes'));


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})


"use strict";

// import required modules
// const express = require('express');
// const morgan = require('morgan');


// const { getAllWines } = require('./getHandlers');

express()
    .use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
    })

// .use(morgan('tiny'))
.use(express.static('./server/assets'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use('/', express.static(__dirname + '/'))

// Any requests for static files will go into the public folder
.use(express.static("public"))

// All endpoints are below this line
// ---------------------------------------------------

// .get("/wines", getAllWines)

// Catch all endpoint
.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This is a catch all. Wrong endpoint. Verify if you are using a valid endpoint.' 
    });
})


// app.listen(PORT, ()=>{
//     console.log(`Server listening on port ${PORT}`);
// })