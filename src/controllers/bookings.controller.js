import { Op } from "sequelize";
import { Booking } from "../models/Booking.js";
import { Room } from "../models/Room.js";
import { User } from "../models/User.js";

export async function createBookingAdmin(req, res){
    try {
        const {
            dateOfEntry,
            departureDate,
            adults,
            children,
            phoneNumber,
            roomId
        } = req.body;
        
        const data = {
            dateOfEntry,
            departureDate,
            adults,
            children,
            phoneNumber,
            status: "active",
            roomId
        };
        
        const hasOverlap = await Booking.findOne({
            where: {
                roomId,
                status: [ "active" ],
                [ Op.and ]: [
                    { dateOfEntry: { [ Op.lte ]: new Date(departureDate) } },
                    { departureDate: { [ Op.gte ]: new Date(dateOfEntry) } }
                ]
            }
        });

        if(hasOverlap){
            return res.status(409).json({ message: "Выбранные даты уже заняты", type: "warning" });
        }

        await Booking.create(data);
        res.status(200).json({ message: "Бронь успешно создана" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось создать бронь" });
    }    
};

export async function createBooking(req, res){
    try {
        const { id, role } = req.user;
        if(role === "admin"){
            return res.status(403).json({ message: "Админ не может бронировать номера", type: "warning" });
        }
        const {
            roomId,
            dateOfEntry,
            departureDate,
            adults,
            children
        } = req.body;
        
        const data = {
            userId: id,
            roomId,
            dateOfEntry,
            departureDate,
            adults,
            children
        };

        const userHasOverlap = await Booking.findOne({
            where: {
                userId: id,
                roomId,
                status: [ "active", "pending" ],
                [ Op.and ]: [
                    { dateOfEntry: { [ Op.lte ]: new Date(departureDate) } },
                    { departureDate: { [ Op.gte ]: new Date(dateOfEntry) } }
                ]
            }
        });

        if(userHasOverlap){
            return res.status(409).json({ message: "У вас уже есть бронь на эти даты", type: "warning" });
        }
        
        const hasOverlap = await Booking.findOne({
            where: {
                roomId,
                status: [ "active" ],
                [ Op.and ]: [
                    { dateOfEntry: { [ Op.lte ]: new Date(departureDate) } },
                    { departureDate: { [ Op.gte ]: new Date(dateOfEntry) } }
                ]
            }
        });

        if(hasOverlap){
            return res.status(409).json({ message: "Выбранные даты уже заняты", type: "warning" });
        }

        await Booking.create(data);
        res.status(200).json({ message: "Заявка на бронь отправлена, ожидайте подтверждения" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось создать бронь" });
    }    
};

export async function getBookings(req, res){
    try {
        const { status } = req.query;
        
        const bookings = await Booking.findAll({
            where: {
                status
            },
            include: [
                {
                    model: Room,
                    attributes: [ "title", "mainImage" ]
                },
                 {
                    model: User,
                    attributes: [ "email", "phoneNumber" ]
                }
            ]
        });

        if(!bookings.length) return res.status(404).json({ message: `На данный момент ${ status === "active" ? "активных броней" : "броней ожидающих подтверждения" } нет`, type: "warning" });
        
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось получить брони" });
    }
}


export async function confirmBooking(req, res){
    try {
        const { id } = req.params;

        const booking = await Booking.findByPk(id);

        if(!booking){
            return res.status(404).json({ message: "Бронь не найдена", type: "warning" });
        }

        await booking.update({ status: "active" });

        res.status(200).json({ message: "Бронь успешно подтверждена" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось подтвердить бронь" });
    }
}

export async function deleteBooking(req, res){
    try {
        const { id } = req.params;
        
        const booking = await Booking.findByPk(id);
        
        if(!booking){
            return res.status(404).json({ message: "Бронь не найдена", type: "warning" });
        }
        
        await booking.destroy();
        res.status(200).json({ message: "Бронь успешно отменена" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось отменить бронь" });
    }
}