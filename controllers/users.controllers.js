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
        console.log(resultInsert);   
        res.status(201).json({
            'msg': true,
            'data': `Se ha regitrado a ${nombre} ${apellido} con exito. Este usuario cuenta con el rol de usuario Basico`
        }); 
    } catch(error) {
        console.log(error);
        res.status(400).json({
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
        conaole.log(resultInsert);
        res.status(201).json({
            'msg': true,
            'data': `Se ha regitrado a ${nombre} ${apellido} con exito. Este usuario cuenta con el rol de Administrador`
        }); 
    } catch(error) {
        console.log(error);
        res.status(400);
    }
};

const singupUser = async() => {};

module.exports = { singinUserBasic, singinUserAdmin, singupUser };