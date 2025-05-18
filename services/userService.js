const User = require("../models/User");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const createUser = async (userData) => {
    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { username: userData.username },
                { email: userData.email },
            ],
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    console.log(userData);
    const user = await User.create(userData);

    return user.toJSON();
};

const loginUser = async (username, password) => {
    const existingUser = await User.findOne({
        where: {
            username: username,
        },
    });

    if (!existingUser) throw new Error("User does not exist");

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) throw new Error("Invalid password");

    return existingUser.toJSON();
};

const updateUserPassword = async (userID, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
        { password: hashedPassword },
        { where: { id_user: userID } }
    );
};

const findUserByEmail = async (email) => {
    const existingUser = await User.findOne({
        where: {
            email: email,
        },
    });

    if (!existingUser) {
        throw new Error("User does not exists");
    }

    return existingUser.toJSON();
};

module.exports = {
    createUser,
    loginUser,
    updateUserPassword,
    findUserByEmail,
};
