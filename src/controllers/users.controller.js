import { User } from "../models/User.js";
import { Booking } from "../models/Booking.js";
import { Room } from "../models/Room.js";


export async function getUserProfile(req, res) {
    try {
        const { id } = req.user;

        const user = await User.findByPk(id, {
            attributes: ["id", "firstname", "lastname", "phoneNumber", "email", "role", "isVerified"]
        });
        
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден", type: "warning" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось получить данные пользователя" });
    }
};

export async function getUserBookings(req, res){
    try {
        const { id } = req.user;

        const bookings = await Booking.findAll({
            where: { userId: id },
            include: {
                model: Room,
                attributes: [ "id", "mainImage", "title" ]
            },
            order: [
                [ "status", "ASC" ]
            ]
        });
``
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Не удалось получить брони пользователя" });
    }
}