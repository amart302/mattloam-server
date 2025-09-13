import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User.js";
import transporter from "../utils/mailer.js";


const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = async (email, code) => {
  try {
    const mailOptions = {
      from: `"Matt Loam" <${ process.env.EMAIL_USER }>`,
      to: email,
      subject: "Код верификации",
      text: `Ваш код верификации: ${ code }`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Ошибка при отправке письма");
  }
};

const generateAccessToken = (id, role) => {
    const payload = { id, role };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
};

export async function signup(req, res) {
    try {
        const { firstname, lastname, phoneNumber, email, password, } = req.body;
        const hashPassword = bcrypt.hashSync(password, 8);

        const user = await User.findOne({
            where: {
                email
            }
        });

        if(user){
            return res.status(409).json({ message: "Пользователь с такой почтой уже существует", type: "warning" });
        }
        
        await User.create({
            firstname,
            lastname,
            phoneNumber,
            email,
            password: hashPassword,
        });

        res.status(200).json({ message: "Успешная регистрация" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка регистрации" });
    }
};

export async function signin(req, res) {
    try {
        const { email, password, } = req.body;

        const user = await User.findOne({ where: { email } });
        
        if(!user){
            return res.status(401).json({ message: "Не правильный логин или пароль! Повторите вход", type: "warning" });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(401).json({ message: "Не правильный номер телефона или пароль! Повторите вход", type: "warning" });
        }

        if(!user.isVerified){
            return res.status(200).json({ requiresEmailVerification: true });
        }

        const token = generateAccessToken(user.id, user.role);
        res.status(200).json({ message: "Успешный вход", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка авторизации" });
    }
};

export async function sendСode(req, res){
    try {
        const { email } = req.body;
        
        const verificationCode = generateCode();
        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.status(404).json({ message: "Пользователь не найден", type: "warning" });
        }

        await user.update({ 
            verificationCode: verificationCode
        });
        sendVerificationEmail(email, verificationCode);
        
        res.status(200).json({ message: "Код отправлен" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось отправить код" });
    }
};

export async function checkingСode(req, res){
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if(!user){
            return res.status(404).json({ message: "Пользователь не найден", type: "warning" });
        }

        if(user.verificationCode === Number(code)){
            await user.update({ 
                isVerified: true,
                verificationCode: null
            });

            const token = generateAccessToken(user.id, user.role);
            res.status(200).json({ message: "Успешная авторизация", token });
        }else{
            res.status(400).json({ message: "Неверный код подтверждения", type: "warning" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при проверки кода" });
    }
};

export async function changePassword(req, res){
    try {
        const { email, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 8);

        const [user] = await User.update(
            {
                password: hashPassword,
                verificationCode: null
            },
            { where: { email } }
        );

        if(user === 0){
            return res.status(404).json({ error: "Пользователь не найден", type: "warning" });
        }

        res.status(200).json({ message: "Пароль успешно изменен" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось сменить пароль" });
    }  
};

export async function check(req, res){
    try {
        const { id } = req.user;

        const user = await User.findByPk(id, {
            attributes: [ "id", "email", "role" ]
        });
        
        if(!user){
            return res.status(404).json({ message: "Пользователь не найден", type: "warning" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось получить данные пользователя" });
    }
};