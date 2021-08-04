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
        res.status(400).json({msg: "bad request"});
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
        res.status(400).json({msg: "Por favor ingrese una contraseña de minimo 8 caracteres"});
    }
};

const tokenValidator = async(req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) throw new Error("400 - Sesion no encontrada");
        jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
            if (err) throw new Error();            
            req.decoded = decoded;
            next();
        }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'algo ha salido mal'
        });
    }
};

const adminIdentificator = async(req, res, next)=>{
    const { idRol } = req.decoded;
    try {
        if(idRol != 1) throw new Error('401 - No Autorizado');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "No tienes autorizacion"
        });
    }
};

module.exports = { emailValidator, passwordEncrypt, tokenValidator, adminIdentificator };