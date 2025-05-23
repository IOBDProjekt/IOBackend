const PetService = require("../services/petService");

const test = async (req, res) => {
    res.json({ message: "test" });
};

module.exports = {
    test,
};
