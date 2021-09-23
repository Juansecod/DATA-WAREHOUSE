var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errorResponse = require('../error/error');
const {emailValidator: mailValid} = require('./validators/mail.validator');

const emailValidator = (req, res, next) => {
    const { email } = req.body;
    try{
        if(!mailValid(email)) throw new Error(400);
        next();
    }catch(error){
        errorResponse(res, error);
    }
};

const passwordEncrypt = async(req, res, next) => {
    try{
        var { contrasena } = req.body;
        if(contrasena.length < 8) throw new Error(400);
        contrasena = bcrypt.hashSync(contrasena, 10);
        req.body.contrasena = contrasena;
        next();
    }catch(error){
        errorResponse(res, error);
    }
};

const tokenValidator = async(req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) throw new Error('Sesion no encontrada');
        jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
            if (err) throw new Error(401);            
            req.decoded = decoded;
            next();
        }); 
    } catch (error) {
        errorResponse(res, error);
    }
};

const adminIdentificator = async(req, res, next)=>{
    const { idRol } = req.decoded;
    try {
        if(idRol != 1) throw new Error(401);
        next();
    } catch (error) {
        errorResponse(res, error);
    }
};

module.exports = { 
    emailValidator,
    passwordEncrypt, 
    tokenValidator, 
    adminIdentificator
};