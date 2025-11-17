import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.sign.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    //User.create({ name, email, password });
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password : passwordHash });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
       
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
    //res.cookie('token', token);
    //res.json({ message: 'Usuario registrado correctamente' });
};










export const login = async (req, res) => {
    const {  email, password } = req.body;
    //User.create({ name, email, password });
    try {
        const foundUser = await User.findOne({ email}); 
        if(!foundUser) return res.status(400).json({ message: 'Usuario no encontrado' });
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
        
        const token = await createAccessToken({ id: foundUser._id });
        res.cookie('token', token);
       
        res.json({
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            createAt : foundUser.createdAt,
            updateAt: foundUser.updatedAt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }

};



export const logout = (req, res) => {
    res.cookie('token',"", { expires: new Date(0) });
    //res.json({ message: 'Sesión cerrada correctamente' });
    console.log("Sesión cerrada correctamente");
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });
    return res.json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        createAt : userFound.createdAt,
        updateAt: userFound.updatedAt
    })
};