const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const authRouter = require("./routes/auth");
const imageRouter = require("./routes/sendImage");

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/", imageRouter);

app.listen(PORT, () => console.log("App is running on port 3000"));
