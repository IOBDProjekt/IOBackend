const Favourite = require("../models/Favourite");
const { Op } = require("sequelize");

const getFavouritesByUserID = async (userID) => {
    const favs = await Favourite.findAll({
        where: {
            id_user: userID,
        },
    });

    return favs;
};

const createFavourite = async (userID, petID) => {
    const existingFav = await Favourite.findOne({
        where: {
            [Op.and]: [{ id_user: userID }, { id_pet: petID }],
        },
    });

    if (existingFav)
        throw new Error("This pet is already in your favourites list");

    const fav = await Favourite.create({ id_user: userID, id_pet: petID });

    return fav.toJSON();
};

module.exports = {
    createFavourite,
    getFavouritesByUserID,
};
