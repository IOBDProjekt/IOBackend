const ApplicationService = require("../services/applicationService.js");
const { StatusCodes } = require("http-status-codes");

const createApplication = async (req, res) => {
    try {
        const applicationData = req.body;

        const newApplication = await ApplicationService.createApplication(applicationData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Wniosek został utworzony", application: newApplication });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await ApplicationService.getAllApplications();

        return res
            .status(StatusCodes.OK)
            .json({ applications });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const getPendingApplications = async (req, res) => {
    try {
        const pending = await ApplicationService.getAllPending();

        return res
            .status(StatusCodes.OK)
            .json({ applications: pending });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const acceptApplication = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const result = await ApplicationService.acceptApplication(id);

        return res
            .status(StatusCodes.OK)
            .json({ message: result.message });
    } catch (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: error.message });
    }
};

const rejectApplication = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const result = await ApplicationService.rejectApplication(id);

        return res
            .status(StatusCodes.OK)
            .json({ message: result.message });
    } catch (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: error.message });
    }
};

module.exports = {
    createApplication,
    getAllApplications,
    getPendingApplications,
    acceptApplication,
    rejectApplication,
};
