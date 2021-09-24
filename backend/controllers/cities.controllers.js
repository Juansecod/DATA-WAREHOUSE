/* Conexion BD */
const sequelize = require('../config/conexion.js');
const { city:deleteScript } = require('../scripts/deleteCities.script');
const errorResponse = require('../error/error');

const getCities = async(req, res) => {
    try {
        const cities = await sequelize.query(`SELECT * FROM ciudades`,
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            'msg': true,
            'data': cities
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const getCitiesesOfCountry = async(req, res) => {
    const { idCountry } = req.params;
    try {
        const cities = await sequelize.query(
            `SELECT * FROM ciudades WHERE idPais = ${idCountry}`,
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            'msg': true,
            'data': cities
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const postCitiesOfCountry = async(req, res) => {
    const { idCountry } = req.params;
    const { nombre } = req.body;
    try {
        const pais = await sequelize.query(`SELECT nombre FROM paises WHERE idPais = ${idCountry}`,
            {type: sequelize.QueryTypes.SELECT}
        );
        if(!pais[0]) throw new Error('Pais invalido');
        if(!nombre) throw new Error('Campos requeridos vacios');
        const result = await sequelize.query(
            `INSERT INTO ciudades(nombre, idPais) VALUES ('${nombre}', ${idCountry});`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(result[1] == 0) throw new Error(400);
        return res.status(201).json({
            'msg': true,
            'data': `La ciudad: ${nombre}, ha sido registrado exitosamente en el pais ${pais[0].nombre}.`
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const updateCity = async(req,res) => {
    const { idCity } = req.params;
    const { nombre } = req.body;
    try {
        const resultUpdate = await sequelize.query(
            `UPDATE ciudades SET nombre = '${nombre}' WHERE idCiudad = ${idCity}`,
            {type: sequelize.QueryTypes.UPDATE}
        );
        if(resultUpdate[1] == 0) throw new Error('400');
		return res.status(201).json({
	            'msg': true,
	            'data': 'Ciudad actualizada con exito'
	        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const deleteCity = async(req, res) => {
    const {idCity} = req.query;
    try {
        const ciudad = await deleteScript(idCity);
		return res.status(200).json( {
	        msg: true,
	        data: `La ciudad ${ciudad[0].nombre} ha sido eliminada con exito`
	    });
    } catch (error) {
        errorResponse(res, error);
    }
};

module.exports = {
    getCities,
    getCitiesesOfCountry,
    postCitiesOfCountry,
    updateCity,
    deleteCity
};