const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
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
// db.sequelize.sync({ alter: false });

app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/image", require("./routes/image"));
app.use("/shelter", require("./routes/shelter"));
app.use("/advice", require("./routes/advice"));
app.use("/favourite", require("./routes/favourite"));
app.use("/species", require("./routes/species"));
app.use("/breed", require("./routes/breed"));
app.use("/pet", require("./routes/pet"));
app.use("/tag", require("./routes/tag"));
app.use("/email", require("./routes/email"));
app.use("/message", require("./routes/messages"));
app.use("/adoption", require("./routes/adoptionForm"));
app.use("/application", require("./routes/application"));

server.listen(PORT, () => console.log(`App is running on port ${PORT}`));

// Websocket Setup

const wss = new WebSocket.Server({ server });
const clients = new Map();

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);
            const { type, userId, toUserId, content, id_pet } = data;

            if (type === "init") {
                ws.userId = userId;

                if (!clients.has(userId)) {
                    clients.set(userId, new Set());
                }
                clients.get(userId).add(ws);

                console.log(`User ${userId} connected (total: ${clients.get(userId).size})`);
            }

            if (type === "message") {
                const receiverSockets = clients.get(toUserId);

                if (receiverSockets) {
                    for (const socket of receiverSockets) {
                        if (socket.readyState === WebSocket.OPEN) {
                            socket.send(
                                JSON.stringify({
                                    type: "new_message",
                                    fromUserId: userId,
                                    content,
                                    id_pet,
                                })
                            );
                        }
                    }
                }
            }
        } catch (err) {
            console.error("WebSocket error: ", err);
        }
    });

    ws.on("close", () => {
        const userId = ws.userId;
        if (userId && clients.has(userId)) {
            const userSockets = clients.get(userId);
            userSockets.delete(ws);

            if (userSockets.size === 0) {
                clients.delete(userId);
            }

            console.log(`User ${userId} disconnected (remaining: ${userSockets.size})`);
        }
    });
});

