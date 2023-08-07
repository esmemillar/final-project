const router = require('express').Router();


const { getAllWines, getWine, getAllProducers, getByName, getProducer } = require('./getHandlers');

router.get('/hello', (req, res) => {
    return res.status(200).json({status: 200, message:"Hello from server"});
});

router.get('/wines',  getAllWines);
router.get('/wines/:wineId', getWine);
router.get('/producers', getAllProducers);
router.get('/producers/:producerId', getProducer);
// router.get('/search/:searchedName', getByName);

module.exports = router;