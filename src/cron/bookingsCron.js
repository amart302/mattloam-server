import cron from "node-cron";
import { Booking } from "../models/Booking.js";
import { Op } from "sequelize";

let isRunning = false;

export const updateBookingStatuses = async () => {
    if (isRunning) {
        console.log("Обновление статусов уже выполняется...");
        return;
    }

    isRunning = true;
    try {
        const today = new Date().toISOString().split("T")[0];
        console.log(`Начало обновления статусов для даты: ${ today }`);

        const affectedCount = await Booking.destroy(
            {
                where: {
                    departureDate: today,
                    status: { 
                        [ Op.in ]: [ "active", "pending" ]
                    }
                }
            }
        );

        console.log(`Успешно обновлено ${ affectedCount } броней`);
    } catch (error) {
        console.error("Ошибка при обновлении статусов броней:", error);
    } finally {
        isRunning = false;
    }
}

export const startBookingCron = () => {
    cron.schedule("0 0 * * *", () => {
        console.log("Запуск ежедневного обновления статусов броней");
        updateBookingStatuses();
    });

    console.log("Booking cron job запущен");
}