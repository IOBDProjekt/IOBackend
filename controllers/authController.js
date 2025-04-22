const db = require("../db.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const { StatusCodes } = require("http-status-codes");

const resend = new Resend(process.env.RESEND_API_KEY);

const register = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };

    try {
        const [result] = await db.query(
            `   
            SELECT 
                u.id_user 
            FROM 
                users u 
            WHERE 
                u.username = ? OR 
                u.email = ?;
            `,
            [user.username, user.email]
        );

        if (result.length > 0)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const [insertResult] = await db.query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [user.username, user.email, hashedPassword]
        );

        return res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            body: insertResult,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

const login = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const [result] = await db.query(
            `   
            SELECT 
                *
            FROM 
                users u 
            WHERE 
                u.username = ?;
            `,
            [user.username]
        );

        if (result.length <= 0)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "User does not exists" });

        const userResult = result[0];
        const authResult = await bcrypt.compare(
            user.password,
            userResult.password
        );

        if (!authResult)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid password" });

        const token = jwt.sign(userResult, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
        });

        // generate test token
        // const token = jwt.sign(userResult, process.env.SECRET_TOKEN);

        return res.json({
            message: "Successful login",
            token,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

const me = (req, res) => {
    res.json(req.user);
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Email is required" });
    }

    try {
        const [result] = await db.query(
            "SELECT * FROM users WHERE email = ?;",
            [email]
        );

        if (result.length <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist",
            });
        }

        const userID = result[0].id_user;

        const token = jwt.sign({ id_user: userID }, process.env.SECRET_TOKEN, {
            expiresIn: "15m",
        });

        resend.emails.send({
            from: "passwordreset@resend.dev",
            to: "jakub213x@gmail.com",
            subject: "Password Reset",
            html: `
            <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>Resetowanie hasła</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 40px 0;">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <tr>
                            <td align="center" style="font-size: 24px; font-weight: bold; color: #333333; padding-bottom: 20px;">
                                Resetowanie hasła
                            </td>
                            </tr>
                            <tr>
                            <td align="center" style="font-size: 16px; color: #666666; padding-bottom: 30px;">
                                Otrzymaliśmy prośbę o zresetowanie hasła. Kliknij poniższy przycisk, aby ustawić nowe hasło.
                            </td>
                            </tr>
                            <tr>
                            <td align="center">
                                <a href="https://iofrontend-5tti.onrender.com/reset-pasword?token=${token}" style="
                                background-color: #4CAF50;
                                color: white;
                                padding: 12px 24px;
                                text-decoration: none;
                                font-size: 16px;
                                border-radius: 6px;
                                display: inline-block;
                                ">
                                Zresetuj hasło
                                </a>
                            </td>
                            </tr>
                            <tr>
                            <td align="center" style="font-size: 12px; color: #999999; padding-top: 30px;">
                                Jeśli nie prosiłeś o reset hasła, możesz zignorować tę wiadomość.
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </body>
                </html>`,
        });

        res.status(StatusCodes.OK).json({
            message: "Email send",
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error",
            body: err,
        });
    }
};

const resetPassword = async (req, res) => {
    const resetToken = req.body.token;
    const password = req.body.password;

    if (!resetToken)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid token" });

    try {
        const data = jwt.verify(resetToken, process.env.SECRET_TOKEN);
        const userId = data.id_user;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `
                UPDATE users
                SET password = ?
                WHERE id_user = ?
            `,
            [hashedPassword, userId]
        );

        return res.status(StatusCodes.OK).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    me,
    forgotPassword,
    resetPassword,
};
