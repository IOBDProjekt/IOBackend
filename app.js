const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./database");
// db.sync({ alter: true });

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/image", require("./routes/sendImage"));
app.use("/shelter", require("./routes/shelter"));
app.use("/advice", require("./routes/advice"));
app.use("/favourite", require("./routes/favourite"));
// app.use("/pet", require("./routes/pet"));

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
