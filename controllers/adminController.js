const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const AdminService = require("../services/adminService.js");

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminService.loginAdmin(username, password);
        admin.role = "admin";

        const token = jwt.sign(admin, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
        });

        return res.json({
            message: "Successful login",
            token,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

const createShelter = async (req, res) => {
    const shelter = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
        city: req.body.city,
    };

    try {
        const hashedPassword = await bcrypt.hash(shelter.password, 10);

        const [result] = await db.execute(
            `
                INSERT INTO 
                    shelters(name, login, password, city)
                VALUES
                    (?, ?, ?, ?);
            `,
            [shelter.name, shelter.login, hashedPassword, shelter.city]
        );

        return res.status(StatusCodes.CREATED).json({
            message: "Successfully created new shelter account",
            shelterId: result.insertId,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

const info = (req, res) => {
    res.json(req.authData);
};

module.exports = {
    login,
    info,
    createShelter,
};
