import express from "express";
import cors from "cors";
import { startConnection } from "./db.js";
import { startBookingCron } from "./cron/bookingsCron.js";
import "dotenv/config";
import { getDirname } from "./utils/pathUtils.js";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";
import usersRoutes from "./routes/users.routes.js";
import bookingsRoutes from "./routes/bookings.routes.js";
import db from "./models/index.js";

const app = express();
const __dirname = getDirname(import.meta.url);

app.use(cors({
    origin: [
        "https://mattloam.ru",
        "https://www.mattloam.ru"
    ],
    credentials: true
}));
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "../uploads")));
app.use("/auth", authRoutes);
app.use("/rooms", roomsRoutes);
app.use("/users", usersRoutes);
app.use("/bookings", bookingsRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.clear();

        db.associate();
        await db.sequelize.sync();
        console.log("Ассоциации установлены, синхронизация завершена");

        await startConnection();

        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${ PORT }`);
        });

        startBookingCron();
    } catch (error) {
        console.log(error);
    }
};

startServer();