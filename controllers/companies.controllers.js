/* Conexion BD */
const sequelize = require('../config/conexion.js');
const { emailValidator } = require('../middleware/validators/mail.validator');
const { company:deleteScript } = require('../scripts/deleteCompanies.script');

const getCompanies = async (req,res) => {
    try {
        const companies = await sequelize.query(
            `SELECT com.idCompania, com.nombre, com.email, ciu.nombre AS 'ciudad', com.direccion, com.telefono 
            FROM companias com JOIN ciudades ciu ON com.idCiudad = ciu.idCiudad;`,
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            'msg': true,
            'data': companies
        });
    } catch (error) {
        res.status(400).json({
            msg: "Bad request"
        });
    }
        
};

const postCompany = async (req, res) => {
    const { nombre, email, direccion = 'N/A', telefono = null, idCiudad } = req.body;
    try{
        const ciudad = await sequelize.query(`SELECT nombre FROM ciudades WHERE idCiudad = ${idCiudad}`,
            {type: sequelize.QueryTypes.SELECT}
        );
        if(!ciudad[0]) throw new Error("Ciudad invalida");
        if(!nombre) throw new Error("Ingresa un nombre valido");
        const resultInsert = await sequelize.query(
            `INSERT INTO companias(nombre, email, direccion, telefono, idCiudad)
            VALUES ('${nombre}', '${email}', '${direccion}', ${telefono}, ${idCiudad})`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(resultInsert[1] == 0) throw new Error("No se ha logrado registrar");
        return res.status(201).json({
            'msg': true,
            'data': `Se ha regitrado ${nombre} con exito. Se registro en la ciudad ${ciudad[0].nombre}`
        }); 
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            msg:"Ups, algo salio mal"
        });
    }
};

const updateCompany = async (req, res) => {
    const { id } = req.params;
	const { nombre, email, direccion, telefono, idCiudad } = req.body;
	try{		
		let sql = `UPDATE companias SET`;
		let valores = "";
		if (nombre != undefined) valores = valores + ` nombre = '${nombre}'`;
		if (email != undefined) {
            const isEmail = emailValidator(email);
            if (!isEmail) throw new Error();
            valores = valores + `, email = '${email}'`;
        }
        if (direccion != undefined) valores = valores + `, direccion = '${direccion}'`;
        if(telefono != undefined) valores = valores + `, telefono = ${telefono}`;
        if(idCiudad != undefined) {
            const ciudad = await sequelize.query(`SELECT nombre FROM ciudades WHERE idCiudad = ${idCiudad}`,
                {type: sequelize.QueryTypes.SELECT}
            );
            if(!ciudad[0]) throw new Error("Ciudad invalida");
            valores = valores + `, idCiudad = ${idCiudad}`;
        }
        if (valores[0] == ",") valores = valores.replace(",","");
		
		const sentenciaSQL = sql + valores + ` WHERE idCompania = ${id}`;

		let resultUpdate = await sequelize.query(`${sentenciaSQL};`,
	        { type: sequelize.QueryTypes.UPDATE });

		if(resultUpdate[1] == 0) throw new Error('400');
		
		return res.status(201).json({
	            'msg': true,
	            'data': 'Compañia actualizada con exito'
	        });
	}catch(error){
		console.log(error);
        return res.status(400).json({
            msg: 'Ups, algo salio mal'
        });
	}
};

const deleteCompany = async(req, res) => {
    const { id:idCompany } = req.query;
    try {
        await deleteScript(idCompany);
		return res.status(200).json( {
	        'msg': true,
	        'data': 'Compañia eliminada con exito'
	    });
    } catch (error) {
        res.status(400).json({
            msg: 'Bad request'
        });
    }
};

module.exports = {
    getCompanies,
    postCompany,
    updateCompany,
    deleteCompany
};