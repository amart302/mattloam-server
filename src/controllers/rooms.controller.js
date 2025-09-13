import { Op } from "sequelize";
import { Booking } from "../models/Booking.js";
import { Room } from "../models/Room.js";
import { deleteFilesByName } from "../utils/fileUtils.js";

export async function addRoom(req, res){
  try {
    const {
      title,
      description,
      guests,
      beds,
      bedrooms,
      floor,
      servicesJson,
      pricingJson,
    } = req.body;

    const files = req.files.map(file => file.filename);

    const pricing = JSON.parse(pricingJson);
    const priceFrom = Math.min(...pricing.map(item => item.price));

    const data = {
      title,
      description,
      guests,
      beds,
      bedrooms,
      floor,
      services: JSON.parse(servicesJson),
      priceFrom,
      pricing,
      mainImage: files[0],
      files,
    };

    await Room.create(data);
    res.status(200).json({ message: "Номер успешно добавлен" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось добавить номер" });
  }  
};

export async function getRooms(req, res){
  try {
    const rooms = await Room.findAll({
      attributes: ["id", "title", "mainImage", "description", "priceFrom", "guests", "beds", "services"]
    });
    
    if(!rooms.length) return res.status(404).json({ message: "На данный момент номеров нет", type: "warning" });

    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить список номеров" });
  }  
};

export async function getRoom(req, res){
    try {
        const { id } = req.params;
        const room = await Room.findByPk(id);
        const bookings = await Booking.findAll({ where: { roomId: id } });

        if(!room){
          return res.status(404).json({ message: "Номер не найден", type: "warning" });
        }

        res.status(200).json({ room, bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось получить информацию о номере" });
    }
};

export async function findRooms(req, res){
  try {
    const { dateOfEntry, departureDate, adults, children } = req.query;
    const totalGuests = Number(adults) + Number(children);
    
    const allRooms = await Room.findAll({
      where: {
        guests: { [ Op.gte ]: totalGuests }
      }
    });

    if(allRooms.length === 0) return res.status(404).json({ message: "Не удалось найти номера соответствующий требованиям", type: "warning" });

    const bookedRooms = await Booking.findAll({
      where: {
        dateOfEntry: { [ Op.lte ]: departureDate },
        departureDate: { [ Op.gte ]: dateOfEntry },
        roomId: allRooms.map(room => room.id) 
      },
      attributes: [ "roomId" ],
      group: [ "roomId" ]
    });

    const bookedRoomIds = bookedRooms.map(room => room.roomId);
    const availableRooms = allRooms.filter(room => !bookedRoomIds.includes(room.id));

    if(availableRooms.length === 0) return res.status(404).json({ message: "Не удалось найти номера соответствующий требованиям", type: "warning" });
    
    res.status(200).json({ rooms: availableRooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить список номеров" });
  }
};

export async function editRoom(req, res){
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      guests, 
      beds, 
      bedrooms, 
      floor, 
      servicesJson, 
      pricingJson, 
      deletedFilesJson 
    } = req.body;

    const newFiles = req.files.map(file => file.filename);
    const room = await Room.findByPk(id);

    if(!room){
      return res.status(404).json({ message: "Номер не найден", type: "warning" });
    }

    const pricing = JSON.parse(pricingJson);
    const deletedFiles = JSON.parse(deletedFilesJson);

    const priceFrom = Math.min(...pricing.map(item => item.price));
    const filteredFiles = room.files.filter(item => !deletedFiles.includes(item));
    const files = [...filteredFiles, ...newFiles];

    if(!filteredFiles.length && !newFiles.length){
      return res.status(400).json({ message: "Добавьте файлы" });
    }

    deleteFilesByName(deletedFiles);

    let newMainImage = null;

    if(deletedFiles.includes(room.mainImage)){
      if(filteredFiles.length){
        newMainImage = filteredFiles[0];
      } else {
        newMainImage = newFiles[0];
      }
    }

    const updateData = {
      title,
      description,
      guests,
      beds,
      bedrooms,
      floor,
      services: JSON.parse(servicesJson),
      priceFrom,
      pricing,
      files
    };

    if(newMainImage){
      updateData.mainImage = newMainImage;
    }

    await room.update(updateData);
    res.status(200).json({ message: "Номер успешно отредактирован" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось отредактировать номер" });
  }
}

export async function deleteRoom(req, res){
  try {
    const { id } = req.params;

    const room = await Room.findByPk(id);
    if(!room){
      return res.status(404).json({ message: "Номер не найден", type: "warning" });
    }
    deleteFilesByName(room.files);

    await room.destroy();
    res.status(200).json({ message: "Номер успешно удален" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось удалить номер" });
  }
};