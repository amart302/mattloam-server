export default function (req, res, next){
    if(req.method === "OPTIONS") return next();

    try {
        const { role } = req.user;
        
        if(role !== "admin"){
            return res.status(403).json({ message: "Отказано в доступе" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};