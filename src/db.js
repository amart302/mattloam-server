import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    logging: false
});

export async function startConnection(){
    try {
        await sequelize.authenticate();
        console.log("Успешное подключение к базе данных");
    } catch (error) {
        console.error("Не удалось подключиться к базе данных");
    }
};