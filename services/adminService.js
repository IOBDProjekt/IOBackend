const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const loginAdmin = async (username, password) => {
    const existingAdmin = await Admin.findOne({
        where: {
            username: username,
        },
    });

    if (!existingAdmin) throw new Error("Admin does not exists");

    const isValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isValid) throw new Error("Invalid password");

    return existingAdmin.toJSON();
};

module.exports = { loginAdmin };
