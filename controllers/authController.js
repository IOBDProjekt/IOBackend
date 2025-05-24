const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const { StatusCodes } = require("http-status-codes");

const resend = new Resend(process.env.RESEND_API_KEY);

const UserService = require("../services/userService.js");

const register = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
        role: "user",
    };

    try {
        const newUser = await UserService.createUser(userData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "User created successfully", user: newUser });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const registerShelterAccount = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
        role: "shelter",
    };

    try {
        const newShelterAccount =
            await UserService.createShelterAccount(userData);

        return res.status(StatusCodes.CREATED).json({
            message: "Shelter account created successfully",
            user: newShelterAccount,
        });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserService.loginUser(email, password);

        const token = jwt.sign(user, process.env.SECRET_TOKEN, {
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

const me = (req, res) => {
    res.json(req.authData);
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await UserService.findUserByEmail(email);

        const userID = user.id_user;

        const token = jwt.sign({ id_user: userID }, process.env.SECRET_TOKEN, {
            expiresIn: "15m",
        });

        resend.emails.send({
            from: "passwordreset@resend.dev",
            to: user.email,
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
                                background-color:rgb(28, 48, 29);
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
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
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

        await UserService.updateUserPassword(userId, password);

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
    registerShelterAccount,
};
