const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const fs = require("fs");

const { StatusCodes } = require("http-status-codes");

const resend = new Resend(process.env.RESEND_API_KEY);

const UserService = require("../services/userService.js");
const path = require("path");

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

        const token = jwt.sign(user, process.env.SECRET_TOKEN);

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

        const resetPasswordToken = jwt.sign(
            { id_user: userID },
            process.env.SECRET_TOKEN
        );

        const registerLink = `${process.env.REACT_APP_URL}/reset-password?token=${resetPasswordToken}`;

        const emailContentPath = path.join(
            __dirname,
            "../emails/forgotPasswordEmail.html"
        );

        const emailContent = fs.readFileSync(emailContentPath, "utf-8");
        const emailHTML = emailContent.replace("{{LINK}}", registerLink);

        const emailPayload = {
            from: "szczesliwe.lapki@resend.dev",
            to: email,
            subject: "Szczęśliwe łapki - Resetowanie hasła",
            html: emailHTML,
        };

        await resend.emails.send(emailPayload);

        return res.json({
            message: "Wiadmość email została pomyślnie wysłana",
        });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const resetToken = req.body.token;
    const password = req.body.password;

    if (!resetToken)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Niepoprawny token" });

    try {
        const data = jwt.verify(resetToken, process.env.SECRET_TOKEN);
        const userId = data.id_user;

        await UserService.updateUserPassword(userId, password);

        return res.status(StatusCodes.OK).json({
            message: "Hasło zostało pomyślnie zmienione",
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

const emailCheck = async (req, res) => {
    const email = req.body["email"];

    try {
        const emailExists = await UserService.isEmailTaken(email);

        if (emailExists) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Email jest już w użyciu" });
        } else {
            const emailToken = await jwt.sign(
                { email: email },
                process.env.SECRET_TOKEN
            );

            const registerLink = `${process.env.REACT_APP_URL}/register?email=${emailToken}`;

            const emailContentPath = path.join(
                __dirname,
                "../emails/createAccountEmail.html"
            );

            const emailContent = fs.readFileSync(emailContentPath, "utf-8");
            const emailHTML = emailContent.replace("{{LINK}}", registerLink);

            const emailPayload = {
                from: "szczesliwe.lapki@resend.dev",
                to: email,
                subject: "Szczęśliwe łapki - Zakładanie konta",
                html: emailHTML,
            };

            await resend.emails.send(emailPayload);

            return res.json({
                message: "Wiadmość email została pomyślnie wysłana",
            });
        }
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const decodeEmail = async (req, res) => {
    const emailToken = req.body.emailToken;

    try {
        const decoded = jwt.verify(emailToken, process.env.SECRET_TOKEN);
        const email = decoded.email;

        return res.json({ email: email });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
    emailCheck,
    decodeEmail,
};
