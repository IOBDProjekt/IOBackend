const Favourite = require("../models/Favourite");
const Pet = require("../models/Pet");
const { Op } = require("sequelize");

const getFavouritesByUserID = async (userID) => {
    const favs = await Favourite.findAll({
        include: [
            {
                model: Pet,
                as: "pet",
            },
        ],
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

    if (existingFav) throw new Error("This pet is already in your favourites list");

    const fav = await Favourite.create({ id_user: userID, id_pet: petID });

    return fav.toJSON();
};

const checkFavouriteByUserID = async (userID, petID) => {
    const result = await Favourite.findOne({
        where: {
            [Op.and]: [
                {
                    id_pet: petID,
                },
                {
                    id_user: userID,
                },
            ],
        },
    });

    if (result) return true;
    return false;
};

const deleteFavourite = async (userID, petID) => {
    const result = await Favourite.destroy({
        where: {
            [Op.and]: [
                {
                    id_pet: petID,
                },
                {
                    id_user: userID,
                },
            ],
        },
    });

    return result;
};

module.exports = {
    createFavourite,
    getFavouritesByUserID,
    checkFavouriteByUserID,
    deleteFavourite,
};
