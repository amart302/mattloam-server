import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Room } from "./Room.js";
import { Booking } from "./Booking.js";

const db = {
    User,
    Room,
    Booking,
    sequelize
};

db.associate = () => {
    db.Booking.belongsTo(db.User, { foreignKey: "userId" });
    db.Booking.belongsTo(db.Room, { foreignKey: "roomId" });
};

export default db;