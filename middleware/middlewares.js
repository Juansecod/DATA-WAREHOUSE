var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const emailValidator = (req, res, next) => {
    try{
        const { email } = req.body;
        const emailSplit1 = email.split('@')[1];
        if(!(!emailSplit1)) { emailSplit2 = emailSplit1.split('.')[1]; }
        if(!emailSplit1 || !emailSplit2) throw new Error ('400 mal mail');
        next();
    }catch(error){
        console.log(error)
        res.status(400).json({msg: "bad request"})
    }
};

const passwordEncrypt = async(req, res, next) => {
    try{
        var { contrasena } = req.body;
        console.log(req.body);
        if(contrasena.length < 8) throw new Error('400');
        contrasena = await bcrypt.hashSync(contrasena, 10);
        req.body.contrasena = contrasena;
        next();
    }catch(error){
        console.log(error);
        res.status(400).json({msg: "Por favor ingrese una contraseña de minimo 8 caracteres"})
    }
}

module.exports = { emailValidator, passwordEncrypt };