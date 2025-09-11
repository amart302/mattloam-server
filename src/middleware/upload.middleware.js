import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let uploadDir = "uploads";
        callback(null, uploadDir);
    },
    filename: function (req, file, callback) {
        let filename = Date.now() + path.extname(file.originalname);
        callback(null, filename);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedTypes = [ "image/jpeg", "image/png", "image/gif" ];
        if(allowedTypes.includes(file.mimetype)){
            callback(null, true);
        }else{
            callback(new Error("Неверный тип файла"), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 100,
        files: 10
    }
});

export const createUploadMiddleware = (fieldName, check = null) => {
    return (req, res, next) => {
        upload.array(fieldName)(req, res, (err) => {
            try {                
                if(err){
                    let errorMessage;
                    let statusCode = 400;
                    
                    switch(err.code) {
                        case "LIMIT_FILE_COUNT":
                            errorMessage = "Максимальное количество файлов: 10";
                            break;
                        case "LIMIT_FILE_SIZE":
                            errorMessage = "Максимальный размер файла: 100MB";
                            break;
                        case err.message === "Неверный тип файла":
                            errorMessage = "Допускаются только файлы формата JPG / JPEG / PNG";
                            statusCode = 415;
                            break;
                        default:
                            errorMessage = "Произошла ошибка при загрузке файлов";
                            statusCode = 500;
                    }
                    
                    return res.status(statusCode).json({ message: errorMessage });
                }

                if(check && (!req.files || req.files.length === 0)) return res.status(400).json({ message: "Добавьте файлы" });

                next();
            } catch (error) {
                res.status(500).json({ message: "Внутренняя ошибка сервера" });
            }
        });
    };
};