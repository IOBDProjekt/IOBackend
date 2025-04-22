const db = require("../db.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
    const shelter = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const [result] = await db.execute(
            `   
            SELECT 
                *
            FROM 
                shelters s 
            WHERE 
                s.username = ?;
            `,
            [shelter.username]
        );

        if (result.length <= 0)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Shelter does not exist" });

        const shelterResult = result[0];
        const authResult = await bcrypt.compare(
            shelter.password,
            shelterResult.password
        );

        if (!authResult)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid password" });

        shelterResult.role = "shelter";
        const token = jwt.sign(shelterResult, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
        });

        // generate test token
        // const token = jwt.sign(shelterResult, process.env.SECRET_TOKEN);

        return res.json({
            message: "Successful login",
            token,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

const info = (req, res) => {
    res.json(req.authData);
};

module.exports = {
    login,
    info,
};
