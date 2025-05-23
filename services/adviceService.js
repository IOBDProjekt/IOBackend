const Advice = require("../models/Advice");

const createAdvice = async (adviceData) => {

    const advice = await Advice.create(adviceData);

    return advice.toJSON();
};

module.exports = {
    createAdvice
};
