const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");

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

// Database Debugging
// db.sequelize.sync({ alter: true });

app.use(express.json());
app.use("/auth", require("./routes/auth"));
// app.use("/image", require("./routes/sendImage"));
app.use("/shelter", require("./routes/shelter"));
app.use("/advice", require("./routes/advice"));
app.use("/favourite", require("./routes/favourite"));
app.use("/species", require("./routes/species"));
app.use("/breed", require("./routes/breed"));
// app.use("/pet", require("./routes/pet"));
app.use("/tag", require("./routes/tag"))

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
