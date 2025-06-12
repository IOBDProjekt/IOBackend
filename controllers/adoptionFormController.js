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

const rejectAdoptionForm = async (req, res) => {
    const id = +req.params.id;
    try {
        const deleted = await AdoptionFormService.deleteById(id);
        if (!deleted) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Wniosek nie istnieje" });
        }
        return res.json({ message: "Wniosek odrzucony" });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

// NOWE: akceptacja — oznacza wniosek i zwierzaka
const acceptAdoptionForm = async (req, res) => {
    const id = +req.params.id;
    try {
        const petID = await AdoptionFormService.getPetIdByFormId(id);
        // 1) zmiana statusu wniosku
        await AdoptionFormService.updateStatus(id, "Zaakceptowany");
        // 2) oznaczenie zwierzaka jako oddanego
        await AdoptionFormService.markPetAsAdopted(petID);

        return res.json({ message: "Wniosek zaakceptowany" });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

module.exports = {
    addAdoptionForm,
    getAllAdoptionForms,
    rejectAdoptionForm,
    acceptAdoptionForm,
};
