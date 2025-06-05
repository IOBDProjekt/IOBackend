const jwt = require("jsonwebtoken");
const fs = require("fs");
const nodemailer = require("nodemailer");

const { StatusCodes } = require("http-status-codes");

const UserService = require("../services/userService.js");
const path = require("path");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: true,
    debug: true,
    logger: true,
    connectionTimeout: 10000,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

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

        return res.status(StatusCodes.CREATED).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
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
        const newShelterAccount = await UserService.createShelterAccount(userData);

        return res.status(StatusCodes.CREATED).json({
            message: "Shelter account created successfully",
            user: newShelterAccount,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
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

        const resetPasswordToken = jwt.sign({ id_user: userID }, process.env.SECRET_TOKEN);

        const registerLink = `${process.env.REACT_APP_URL}/reset-password?token=${resetPasswordToken}`;

        const emailContentPath = path.join(__dirname, "../emails/forgotPasswordEmail.html");

        const emailContent = fs.readFileSync(emailContentPath, "utf-8");
        const emailHTML = emailContent.replace("{{LINK}}", registerLink);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Szczęśliwe łapki - Przypomnienie hasła",
            html: emailHTML,
            text: "Przypomnienie hasła",
        };

        const info = await transporter.sendMail(mailOptions);

        return res.json({
            message: "Wiadmość email została pomyślnie wysłana",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const resetToken = req.body.token;
    const password = req.body.password;

    if (!resetToken) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Niepoprawny token" });

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
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email jest już w użyciu" });
        } else {
            const emailToken = jwt.sign({ email: email }, process.env.SECRET_TOKEN);

            const registerLink = `${process.env.REACT_APP_URL}/register?email=${emailToken}`;

            const emailContentPath = path.join(__dirname, "../emails/createAccountEmail.html");

            const emailContent = fs.readFileSync(emailContentPath, "utf-8");
            const emailHTML = emailContent.replace("{{LINK}}", registerLink);

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Szczęśliwe łapki - Zakładanie konta",
                html: emailHTML,
                text: "Dołącz do nasze platformy już dziś!",
            };

            const info = await transporter.sendMail(mailOptions);

            return res.json({
                message: "Wiadmość email została pomyślnie wysłana",
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
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

const getAllShelterAccounts = async (req, res) => {
    try {
        const shelterAccounts = await UserService.findUserByRole("shelter");

        return res.json({ shelterAccounts: shelterAccounts });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const updateShelterAccount = async (req, res) => {
    const userID = req.params.id;
    const userData = {
        firstname: req.body["firstname"],
        lastname: req.body["lastname"],
        city: req.body["city"],
        email: req.body["email"],
    };

    try {
        const account = await UserService.updateUser(userID, userData);

        return res.json({ message: "Pomyślnie zaktualizowano informacje" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
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
    getAllShelterAccounts,
    updateShelterAccount,
};
