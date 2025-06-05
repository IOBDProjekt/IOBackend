const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const FavouriteService = require("../services/favouriteService");

const newFavourite = async (req, res) => {
    const petID = req.body["id_pet"];
    const userID = req.authData["id_user"];

    try {
        const fav = await FavouriteService.createFavourite(userID, petID);

        return res.status(StatusCodes.CREATED).json({
            message: "Successfuly added pet to your favourites list",
            favourite: fav,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const removeFavourite = async (req, res) => {
    const petID = req.params.id;
    const userID = req.authData["id_user"];

    try {
        const result = await FavouriteService.deleteFavourite(userID, petID);

        return res.status(StatusCodes.OK).json({ message: "Pomyślnie usunięto polubienie" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const allFavourite = async (req, res) => {
    const userID = req.authData["id_user"];

    try {
        const favs = await FavouriteService.getFavouritesByUserID(userID);

        return res.json({
            favourites: favs,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

const checkFavourite = async (req, res) => {
    const userID = req.authData["id_user"];
    const petID = req.body["id_pet"];

    try {
        const result = await FavouriteService.checkFavouriteByUserID(userID, petID);

        return res.json({ result: result });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = {
    newFavourite,
    removeFavourite,
    allFavourite,
    checkFavourite,
};
