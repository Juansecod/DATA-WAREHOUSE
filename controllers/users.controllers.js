/* Conexion BD */
const sequelize = require('../config/conexion.js');

/* Librerias del package.json para usar */
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const singinUserBasic = async (req, res) => {
    const { nombre, apellido, email, contrasena } = req.body;
    console.log(req.body);
    try{
        const resultInsert = await sequelize.query(
            `INSERT INTO usuarios(nombre, apellido, email, contrasena, idRol)
            VALUES ('${nombre}', '${apellido}', '${email}', '${contrasena}', 2)`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(resultInsert[1] == 0) throw new Error("No se ha logrado registrar");
        return res.status(201).json({
            'msg': true,
            'data': `Se ha regitrado a ${nombre} ${apellido} con exito. Este usuario cuenta con el rol de usuario Basico`
        }); 
    } catch(error) {
        return res.status(400).json({
            msg:"Ups, algo salio mal"
        });
    }
};

const singinUserAdmin = async (req, res) => {
    const { nombre, apellido, email, contrasena } = req.body;
    try{
        const resultInsert = await sequelize.query(
            `INSERT INTO usuarios(nombre, apellido, email, contrasena, idRol)
            VALUES ('${nombre}', '${apellido}', '${email}', '${contrasena}', 1)`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(resultInsert[1] == 0) throw new Error("No se ha logrado registrar");
        return res.status(201).json({
            'msg': true,
            'data': `Se ha regitrado a ${nombre} ${apellido} con exito. Este usuario cuenta con el rol de Administrador`
        }); 
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            msg:"Ups, algo salio mal"
        });
    }
};

const singupUser = async(req, res) => {
    const { email, contrasena } = req.body;
    try{
        const user = await sequelize.query(`SELECT * FROM usuarios WHERE email='${email}' LIMIT 1`,
            {type: sequelize.QueryTypes.SELECT}
        );
        if(!user) throw new Error('Usuario no encontrado');
        const token = await bcrypt.compare(contrasena, user[0].contrasena).then((authorization) => {
			if(authorization){
				const jwtToken = jwt.sign({'idUsuario': user[0].idUsuario, 'idRol': user[0].idRol}, 
                                    process.env.KEY_TOKEN, { expiresIn: process.env.EXPIRES });
        		return jwtToken;
			}else{
				throw new Error('400');
			}
		});
		return res.status(200).json( {
	        'msg': true,
	        'data': `Bienvenido ${user[0].nombre} ${user[0].apellido}`,
	        'token': token
	    });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            msg:"Ups, algo salio mal"
        });
    }
};

module.exports = { singinUserBasic, singinUserAdmin, singupUser };