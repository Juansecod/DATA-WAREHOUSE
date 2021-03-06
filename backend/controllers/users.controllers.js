/* Conexion BD */
const sequelize = require('../config/conexion.js');

/* Dependencias */
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { deleteData } = require('../scripts/delete.script');
const { emailValidator } = require('../middleware/validators/mail.validator');
const errorResponse = require('../error/error');

const getUSers = async (req, res) =>{
    try {
        const result = await sequelize.query(`SELECT u.idUsuario, u.nombre, u.apellido, u.email, r.nombre AS 'rol' 
            FROM usuarios u LEFT JOIN rolesUsuario r ON u.idRol = r.idRol;`, 
	    	{type:sequelize.QueryTypes.SELECT});
	    return res.status(200).json({
	        msg: true,
	        data: result
	    });
    } catch (error) {
        errorResponse(res, error);
    }
};

const getUSer = async (req, res) =>{
    const { id } = req.params; 
    try {
        const result = await sequelize.query(`SELECT u.idUsuario, u.nombre, u.apellido, u.email, r.nombre AS 'rol' 
            FROM usuarios u LEFT JOIN rolesUsuario r ON u.idRol = r.idRol WHERE u.idUsuario=${id}`, 
	    	{type:sequelize.QueryTypes.SELECT});
        if(!result[0]) throw new Error(404);
	    return res.status(200).json({
	        msg: true,
	        data: result
	    });
    } catch (error) {
        errorResponse(res, error);
    }
};

const singUpUser = async (req, res) => {
    const { nombre, apellido, email, contrasena, idRol } = req.body;
    try{
        const rol = await sequelize.query(`SELECT nombre FROM rolesUsuario WHERE idRol = ${idRol}`,
            {type: sequelize.QueryTypes.SELECT}
        );
        if(!rol[0]) throw new Error('Rol invalido');
        const resultInsert = await sequelize.query(
            `INSERT INTO usuarios(nombre, apellido, email, contrasena, idRol)
            VALUES ('${nombre}', '${apellido}', '${email}', '${contrasena}', ${idRol})`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(resultInsert[1] == 0) throw new Error(400);
        return res.status(201).json({
            msg: true,
            data: `Se ha regitrado a ${nombre} ${apellido} con exito. Este usuario cuenta con el rol de usuario ${rol[0].nombre}`
        }); 
    } catch(error) {
        errorResponse(res, error);
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
	const { nombre, apellido, email, contrasena} = req.body;
	try{		
		let sql = `UPDATE usuarios SET`;
		let valores = "";
		if (nombre != undefined) valores = valores + ` nombre = '${nombre}'`;
		if (apellido != undefined) valores = valores + `, apellido = '${apellido}'`;
		if (email != undefined) {
            if (!emailValidator(email)) throw new Error('Formato de email invalido');
            valores = valores + `, email = '${email}'`;
        }
        if(contrasena != undefined){
            if(contrasena.length < 8) throw new Error('Contrase??a menor de 8 caracteres');
            contrasenaEncrypt = await bcrypt.hashSync(contrasena, 10);
            valores = valores + `, contrasena = '${contrasenaEncrypt}'`;
        }
        if (valores[0] == ",") valores = valores.replace(",","");
		
		const sentenciaSQL = sql + valores + `WHERE idUsuario = ${id}`;

		let resultUpdate = await sequelize.query(`${sentenciaSQL};`,
	        { type: sequelize.QueryTypes.UPDATE });

		if(resultUpdate[1] == 0) throw new Error(400);
		
		return res.status(201).json({
            msg: true,
            data: `Usuario actualizado con exito`
	    });
	}catch(error){
		errorResponse(res, error);
	}
};

const updateRolUser = async(req, res) => {
	const {idUsuario} = req.params;
	const {idRol} = req.query;
	try{
        const rolExist = await sequelize.query(`SELECT nombre FROM rolesUsuario WHERE idRol = ${idRol}`,
            { type: sequelize.QueryTypes.SELECT });
        if(!rolExist[0]) throw new Error('Rol invalido');
		const resultUpdate = await sequelize.query(`UPDATE usuarios SET idRol = ${idRol} WHERE idUsuario = ${idUsuario}`, 
			{ type: sequelize.QueryTypes.UPDATE});
		if(resultUpdate[1] == 0) throw new Error(400);
		return res.status(201).json({
            msg: true,
            data: `Usuario actualizado con exito`
        });
	}catch(error){
		errorResponse(res, error);
	}
};

const singInUser = async(req, res) => {
    const { email, contrasena } = req.body;
    try{
        const user = await sequelize.query(`SELECT * FROM usuarios WHERE email='${email}' LIMIT 1`,
            {type: sequelize.QueryTypes.SELECT}
        );
        if(!user[0]) throw new Error(404);
        const {idUsuario,idRol} = user[0];
        const token = await bcrypt.compare(contrasena, user[0].contrasena).then((authorization) => {
			if(authorization){
				const jwtToken = jwt.sign({idUsuario, idRol}, 
                                    process.env.KEY_TOKEN, { expiresIn: process.env.EXPIRES });
        		return jwtToken;
			}else{
				throw new Error(400);
			}
		});
		return res.status(200).json( {
	        msg: true,
	        data: `Bienvenido ${user[0].nombre} ${user[0].apellido}`,
            admin: (user[0].idRol == 1) ? true : false,
	        token
	    });
    }catch(error){
        errorResponse(res, error);
    }
};

const deleteUser = async(req, res) => {
    const {idUsuario} = req.query;
    try {
        const user = await sequelize.query(
            `SELECT * FROM usuarios WHERE idUsuario = ${idUsuario}`, 
            { type: sequelize.QueryTypes.SELECT }
        );
        if(!user[0]) throw new Error(404);
        await deleteData('usuarios','idUsuario',idUsuario);
		return res.status(200).json( {
	        msg: true,
	        data: 'Usuario eliminado con exito'
	    });
    } catch (error) {
        errorResponse(res, error);
    }
};

module.exports = { 
    getUSers,
    getUSer,
    singInUser,
    updateUser,
    updateRolUser,
    singUpUser,
    deleteUser 
};
