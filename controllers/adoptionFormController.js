const { StatusCodes } = require("http-status-codes");

const AdoptionFormService = require("../services/adoptionFormService.js");

const addAdoptionForm = async (req, res) => {
    const { motivation, id_user, id_pet, pesel } = req.body;

    try {
        const data = {
            motivation,
            id_pet,
            id_user,
            pesel,
            status: "Otwarte",
        };

        const result = await AdoptionFormService.submitAdoptionForm(data);

        return res.status(StatusCodes.CREATED).json({ messsage: "Pomyślnie zgłoszono wniosek o adopcje" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getAllAdoptionForms = async (req, res) => {
    const userID = req.authData["id_user"];

    try {
        const forms = await AdoptionFormService.getAllByUserID(userID);

        return res.json({ forms: forms });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = {
    addAdoptionForm,
    getAllAdoptionForms,
};
