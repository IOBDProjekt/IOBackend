const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, tokenData) => {
        if (err) return res.sendStatus(StatusCodes.FORBIDDEN);
        req.authData = tokenData;
    });

    next();
};

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.authData || req.authData.role !== requiredRole) {
            return res.sendStatus(StatusCodes.FORBIDDEN);
        }
        next();
    };
};

module.exports = {
    authorizeRole,
    authenticate,
};
