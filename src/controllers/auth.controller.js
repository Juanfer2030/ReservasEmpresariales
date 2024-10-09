import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';

export const registro = async(req,res) => {
    const {email, contraseña, usuario} = req.body;

    try {
        // con este codigo encryptamos la contraseña
        const contraseñaHash = await bcrypt.hash(contraseña,10)

        const newUser = new User({
            usuario,
            email,
            contraseña: contraseñaHash
        })
        // guardo el usuario
        const userFound = await newUser.save();
        // creo el token
        const token = await createAccessToken({id: userFound._id});

        res.cookie('token', token);
        res.json({
            id: userFound._id,
            usuario: userFound.usuario,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch(error) {
        res.status(500).json({message:error.message});
    }
};


export const login = async(req,res) => {
    const {email, contraseña} = req.body;

    try {

        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

        // con este codigo encryptamos la contraseña
        const isMatch = await bcrypt.compare(contraseña,userFound.contraseña);

        if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});

        // creo el token
        const token = await createAccessToken({id: userFound._id});

        res.cookie('token', token);
        res.json({
            id: userFound._id,
            usuario: userFound.usuario,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch(error) {
        res.status(500).json({message:error.message});
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}