const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");

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

const sendPublicEmail = async (req, res) => {
    const { to, subject, html, text } = req.body;

    if (!to || !subject || (!html && !text)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Recipient, subject, and either HTML or text content are required.",
        });
    }

    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: to,
            subject: subject,
            html: html,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: %s", info.messageId);

        return res.status(StatusCodes.OK).json({ message: "Email sent successfully!", messageId: info.messageId });
    } catch (err) {
        console.error("Error sending email:", err);
        if (err.code) {
            console.error("Nodemailer error code:", err.code);
        }
        if (err.response) {
            console.error("Nodemailer error response:", err.response);
        }
        if (err.responseCode) {
            console.error("Nodemailer error response code:", err.responseCode);
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to send email.", error: err.message });
    }
};

module.exports = {
    sendPublicEmail,
};
