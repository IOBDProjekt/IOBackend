const db = require("../db.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
    const admin = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const [result] = await db.execute(
            `   
            SELECT 
                *
            FROM 
                admins a
            WHERE 
                a.username = ?;
            `,
            [admin.username]
        );

        if (result.length <= 0)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Shelter does not exist" });

        const adminResult = result[0];
        const authResult = await bcrypt.compare(
            admin.password,
            adminResult.password
        );

        if (!authResult)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid password" });

        adminResult.role = "admin";
        const token = jwt.sign(adminResult, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
        });

        // generate test token
        // const token = jwt.sign(adminResult, process.env.SECRET_TOKEN);

        return res.json({
            message: "Successful login",
            token,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
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
