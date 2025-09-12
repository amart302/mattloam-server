import { body, query } from "express-validator";


export const signUpValidation = [
    body("firstname")
        .trim()
        .notEmpty().withMessage("Имя обязателено")
        .isLength({ max: 100 }).withMessage("Имя не должно превышать 100 символов"),
    body("lastname")
        .trim()
        .notEmpty().withMessage("Фамилия обязателена")
        .isLength({ max: 100 }).withMessage("Фамилия не должна превышать 100 символов"),
    body("phoneNumber")
        .notEmpty().withMessage("Номер телефона обязателен")
        .trim()
        .matches(/^\+7\d{10}$/).withMessage("Некорректный номер телефона. Формат: +7XXXXXXXXXX")
        .isLength({ min: 12, max: 12 }).withMessage("Номер должен содержать 12 символов"),
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 100 }).withMessage("Почта не должна превышать 100 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 100 }).withMessage("Пароль не должен превышать 100 символов")
];

export const signInValidation = [
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 100 }).withMessage("Почта не должна превышать 100 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 100 }).withMessage("Пароль не должен превышать 100 символов")
];

export const sendСodeValidation = [
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 100 }).withMessage("Почта не должна превышать 100 символов")
        .normalizeEmail()
];

export const checkingСodeValidation = [
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 100 }).withMessage("Почта не должна превышать 100 символов")
        .normalizeEmail(),
    body("code")
        .trim()
        .notEmpty().withMessage("Код обязателен")
        .isLength({ min: 6, max: 6 }).withMessage("Код должен содержать 6 символов"),
];

export const changePasswordValidation = [
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 100 }).withMessage("Почта не должна превышать 100 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 100 }).withMessage("Пароль не должен превышать 100 символов")
];

export const createRoomValidation = [
    body("title")
        .trim()
        .notEmpty().withMessage("Название обязательно")
        .isLength({ max: 100 }).withMessage("Название не должно превышать 100 символов"),
    body("description")
        .trim()
        .notEmpty().withMessage("Описание обязательно")
        .isLength({ max: 500 }).withMessage("Описание не должно превышать 500 символов"),
    body("guests")
        .trim()
        .notEmpty().withMessage("Число гостей обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число гостей должно быть целым число от 1 до 10")
        .toInt(),
    body("beds")
        .trim()
        .notEmpty().withMessage("Число кроватей обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число кроватей должно быть целым число от 1 до 10")
        .toInt(),
    body("bedrooms")
        .trim()
        .notEmpty().withMessage("Число спален обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число спален должно быть целым число от 1 до 10")
        .toInt(),
    body("floor")
        .trim()
        .notEmpty().withMessage("Этаж обязателен")
        .isInt({ min: 1, max: 10 }).withMessage("Этаж должен быть целым число от 1 до 10")
        .toInt(),
    body("servicesJson")
        .custom(value => {
            if(!JSON.parse(value).length) throw new Error("Добавьте удобства");
            return true;
        }),
    body("pricingJson")
        .custom(value => {
            if(!JSON.parse(value).length) throw new Error("Добавьте цены");
            return true;
        })
];

export const editRoomValidation = [
    body("title")
        .trim()
        .notEmpty().withMessage("Название обязательно")
        .isLength({ max: 100 }).withMessage("Название не должно превышать 100 символов"),
    body("description")
        .trim()
        .notEmpty().withMessage("Описание обязательно")
        .isLength({ max: 500 }).withMessage("Описание не должно превышать 500 символов"),
    body("guests")
        .trim()
        .notEmpty().withMessage("Число гостей обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число гостей должно быть целым число от 1 до 10")
        .toInt(),
    body("beds")
        .trim()
        .notEmpty().withMessage("Число кроватей обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число кроватей должно быть целым число от 1 до 10")
        .toInt(),
    body("bedrooms")
        .trim()
        .notEmpty().withMessage("Число спален обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число спален должно быть целым число от 1 до 10")
        .toInt(),
    body("floor")
        .trim()
        .notEmpty().withMessage("Этаж обязателен")
        .isInt({ min: 1, max: 10 }).withMessage("Этаж должен быть целым число от 1 до 10")
        .toInt(),
    body("servicesJson")
        .custom(value => {
            if(!JSON.parse(value).length) throw new Error("Добавьте удобства");
            return true;
        }),
    body("pricingJson")
        .custom(value => {
            if(!JSON.parse(value).length) throw new Error("Добавьте цены");
            return true;
        })
];

export const findRoomsValidation = [
    query("dateOfEntry")
        .trim()
        .notEmpty().withMessage("Дата въезда обязательна")
        .isDate({ format: 'YYYY-MM-DD' }).withMessage("Неверный формат даты въезда.")
        .custom((value) => {
            const entryDate = new Date(value);
            const maxAllowedDate = new Date();
            maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + 1);
            
            if(entryDate > maxAllowedDate){
                throw new Error("Дата въезда не может быть больше чем на 1 год вперед");
            }
            return true;
        }),
    query("departureDate")
        .trim()
        .notEmpty().withMessage("Дата выезда обязательна")
        .isDate({ format: 'YYYY-MM-DD' }).withMessage("Неверный формат даты выезда.")
        .custom((value) => {
            const entryDate = new Date(value);
            const maxAllowedDate = new Date();
            maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + 1);
            
            if(entryDate > maxAllowedDate){
                throw new Error("Дата въезда не может быть больше чем на 1 год вперед");
            }
            return true;
        }),
    query("adults")
        .trim()
        .notEmpty().withMessage("Число взрослых обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число взрослых должно быть целым число от 1 до 10")
        .toInt(),
    query("children")
        .trim()
        .notEmpty().withMessage("Число детей обязательно")
        .isInt({ min: 0, max: 10 }).withMessage("Число детей должно быть целым число от 0 до 10")
        .toInt()
];

export const createBookingValidation = [
    body("roomId")
        .trim()
        .notEmpty().withMessage("Id номера обязателен")
        .isInt().withMessage("Id номера должен быть целым числом")
        .toInt(),
    body("dateOfEntry")
        .trim()
        .notEmpty().withMessage("Дата въезда обязательна")
        .isDate({ format: 'YYYY-MM-DD' }).withMessage("Неверный формат даты въезда.")
        .custom((value) => {
            const entryDate = new Date(value);
            const maxAllowedDate = new Date();
            maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + 1);
            
            if(entryDate > maxAllowedDate){
                throw new Error("Дата въезда не может быть больше чем на 1 год вперед");
            }
            return true;
        }),
    body("departureDate")
        .trim()
        .notEmpty().withMessage("Дата выезда обязательна")
        .isDate({ format: 'YYYY-MM-DD' }).withMessage("Неверный формат даты выезда.")
        .custom((value) => {
            const entryDate = new Date(value);
            const maxAllowedDate = new Date();
            maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + 1);
            
            if(entryDate > maxAllowedDate){
                throw new Error("Дата въезда не может быть больше чем на 1 год вперед");
            }
            return true;
        }),
    body("adults")
        .trim()
        .notEmpty().withMessage("Число взрослых обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число взрослых должно быть целым число от 1 до 10")
        .toInt(),
    body("children")
        .trim()
        .notEmpty().withMessage("Число детей обязательно")
        .isInt({ min: 0, max: 10 }).withMessage("Число детей должно быть целым число от 0 до 10")
        .toInt()
];

export const createBookingAdminValidation = [
    body("roomId")
        .trim()
        .notEmpty().withMessage("Id номера обязателен")
        .isInt().withMessage("Id номера должен быть целым числом")
        .toInt(),
    body("dateOfEntry")
        .trim()
        .notEmpty().withMessage("Дата въезда обязательна")
        .isDate({ format: 'YYYY-MM-DD' }).withMessage("Неверный формат даты въезда.")
        .custom((value) => {
            const entryDate = new Date(value);
            const maxAllowedDate = new Date();
            maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + 1);
            
            if(entryDate > maxAllowedDate){
                throw new Error("Дата въезда не может быть больше чем на 1 год вперед");
            }
            return true;
        }),
    body("departureDate")
        .trim()
        .notEmpty().withMessage("Дата выезда обязательна")
        .isDate({ format: 'YYYY-MM-DD' }).withMessage("Неверный формат даты выезда.")
        .custom((value) => {
            const entryDate = new Date(value);
            const maxAllowedDate = new Date();
            maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + 1);
            
            if(entryDate > maxAllowedDate){
                throw new Error("Дата въезда не может быть больше чем на 1 год вперед");
            }
            return true;
        }),
    body("adults")
        .trim()
        .notEmpty().withMessage("Число взрослых обязательно")
        .isInt({ min: 1, max: 10 }).withMessage("Число взрослых должно быть целым число от 1 до 10")
        .toInt(),
    body("children")
        .trim()
        .notEmpty().withMessage("Число детей обязательно")
        .isInt({ min: 0, max: 10 }).withMessage("Число детей должно быть целым число от 0 до 10")
        .toInt(),
    body("phoneNumber")
        .notEmpty().withMessage("Номер телефона обязателен")
        .trim()
        .matches(/^\+7\d{10}$/).withMessage("Некорректный номер телефона. Формат: +7XXXXXXXXXX")
        .isLength({ min: 12, max: 12 }).withMessage("Номер должен содержать 12 символов")
];