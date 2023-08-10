const router = require('express').Router();


const { getAllWines, getWine, getAllProducers, getByName, getProducer, getUsers, getUser } = require('./getHandlers');
const { getFavorites, createFavorites, updateFavorites, deleteFavorites } = require('./favoritesHandlers')

router.get('/hello', (req, res) => {
    return res.status(200).json({status: 200, message:"Hello from server"});
});

router.get('/wines',  getAllWines);
router.get('/wines/:wineId', getWine);
router.get('/producers', getAllProducers);
router.get('/producers/:producerId', getProducer);
// router.get('/search/:searchedName', getByName);
router.get("/users", getUsers);
router.get("/users/:userId", getUser);

router.get("/favorites", getFavorites);


router.post("/favorites", createFavorites);
router.post("/user", () => {});

router.patch("/favorites/:favoritesId", updateFavorites);
router.delete("/favorites/:favoritesId", deleteFavorites);






module.exports = router;