import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Room = sequelize.define("Room", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING(100), allowNull: false },
        mainImage: { type: DataTypes.STRING(255), allowNull: false },
        files: { type: DataTypes.JSON, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        priceFrom: { type: DataTypes.INTEGER, allowNull: false },
        pricing: { type: DataTypes.JSON, allowNull: false },
        guests: { type: DataTypes.INTEGER, allowNull: false },
        beds: { type: DataTypes.INTEGER, allowNull: false },
        bedrooms: { type: DataTypes.INTEGER, allowNull: false },
        floor: { type: DataTypes.INTEGER, allowNull: false },
        services: { type: DataTypes.JSON, allowNull: false }
    }, {
        tableName: "rooms",
        timestamps: true
    }
);
