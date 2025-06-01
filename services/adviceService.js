const Advice = require("../models/Advice");
const { Op } = require("sequelize");

const createAdvice = async (adviceData) => {

    const advice = await Advice.create(adviceData);

    return advice.toJSON();
};

const updateAdviceTitle = async (adviceData) => {
    const adviceToUpdate = await Advice.findByPk(adviceData.id_advice);
    if (!adviceToUpdate) {
        throw new Error("No advice with that ID!");
    }

    const currentUserAdvice = await Advice.findOne({
        where: {
            id_advice: adviceData.id_advice,
            id_shelter: adviceData.id_shelter
        }
    });
    if (!currentUserAdvice) {
        throw new Error("Not yours advice!");
    }
    
    await Advice.update(
        { title: adviceData.title },
        { where: { id_advice: adviceData.id_advice } }
    );
};

const updateAdviceContent = async ( adviceData ) => {
    const adviceToUpdate = await Advice.findByPk(adviceData.id_advice);
    if (!adviceToUpdate) {
        throw new Error("No advice with that ID!");
    }
    
    const currentUserAdvice = await Advice.findOne({
            where: {
                id_advice: adviceData.id_advice,
                id_shelter: adviceData.id_shelter
            }
        });
    if (!currentUserAdvice) {
        throw new Error("Not yours advice!");
    }

    await Advice.update(
        { content: adviceData.content },
        { where: { id_advice: adviceData.id_advice } }
    );
};

module.exports = {
    createAdvice,
    updateAdviceTitle,
    updateAdviceContent,
};