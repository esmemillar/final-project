const router = require('express').Router();


const { getAllWines, getAllProducers, getByName } = require('./getHandlers');

router.get('/hello', (req, res) => {
    return res.status(200).json({status: 200, message:"Hello from server"});
});

router.get('/wines',  getAllWines);
router.get('/producers', getAllProducers);
// router.get('/search/:searchedName', getByName);

module.exports = router;