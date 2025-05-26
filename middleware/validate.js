const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validators = {
    register: require("../validators/registerValidator"),
    login: require("../validators/loginValidator"),
    password: require("../validators/passwordValidator"),
    shelter: require("../validators/shelterValidator"),
    email: require("../validators/emailValidator"),
    species: require("../validators/speciesValidator"),
    breed: require("../validators/breedValidator"),
    tag: require("../validators/tagValidator"),
    advice: require("../validators/adviceValidator"),
    pet: require("../validators/petValidator"),
};

const validate = (validator) => {
    return async (req, res, next) => {
        await Promise.all(validators[validator].map((v) => v.run(req)));

        let result = [];
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            result = errors.array().map((e) => e.msg);
        }

        if (result.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                messages: result,
            });
        }

        next();
    };
};

module.exports = {
    validate,
};
