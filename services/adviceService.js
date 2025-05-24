const Advice = require("../models/Advice");
const { Op } = require("sequelize");

const createAdvice = async (adviceData) => {

    const advice = await Advice.create(adviceData);

    return advice.toJSON();
};

const updateAdviceTitle = async (shelterID ,adviceID, newTitle) => {
    const adviceToUpdate = await Advice.findByPk(adviceID);
    if (!adviceToUpdate) {
        throw new Error("No advice with that ID!");
    }

    const currentUserAdvice = await Advice.findOne({
        where: {
            id_advice: adviceID,
            id_shelter: shelterID
        }
    });
    if (!currentUserAdvice) {
        throw new Error("Not yours advice!");
    }
    
    await Advice.update(
        { title: newTitle },
        { where: { id_advice: adviceID } }
    );
};

const updateAdviceContent = async ( shelterID ,adviceID, newContent) => {
    const adviceToUpdate = await Advice.findByPk(adviceID);
    if (!adviceToUpdate) {
        throw new Error("No advice with that ID!");
    }
    
    const currentUserAdvice = await Advice.findOne({
            where: {
                id_advice: adviceID,
                id_shelter: shelterID
            }
        });
    if (!currentUserAdvice) {
        throw new Error("Not yours advice!");
    }

    await Advice.update(
        { content: newContent },
        { where: { id_advice: adviceID } }
    );
};

module.exports = {
    createAdvice,
    updateAdviceTitle,
    updateAdviceContent,
};