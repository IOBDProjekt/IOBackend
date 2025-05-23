const Favourite = require("../models/Favourite");
const { Op } = require("sequelize");

const getFavouritesByUser = async (userID) => {
    return;
};

const createFavourite = async (userID, petID) => {
    const existingFav = Favourite.findOne({
        where: {
            [Op.and]: [{ id_user: userID }, { id_pet: petID }],
        },
    });

    if (existingFav)
        throw new Error("This pet is already in your favourites list");

    const fav = await Favourite.create({ userID, petID });

    return fav.toJSON();
};

module.exports = {};
