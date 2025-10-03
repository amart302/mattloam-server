import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
        firstname: { type: DataTypes.STRING(100), allowNull: false },
        lastname: { type: DataTypes.STRING(100), allowNull: false },
        phoneNumber: { type: DataTypes.STRING(12), allowNull: false },
        role: { type: DataTypes.ENUM("admin", "user"), allowNull: true, defaultValue: "user" },
        password: { type: DataTypes.STRING(255), allowNull: false },
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        verificationCode: { type: DataTypes.INTEGER }
    }, {
        tableName: "users",
        timestamps: true
    }
);