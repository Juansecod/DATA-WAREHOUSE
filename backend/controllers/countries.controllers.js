/* Conexion BD */
const sequelize = require('../config/conexion');
const { country:deleteScript } = require('../scripts/deleteCountries.script');
const errorResponse = require('../error/error');

const getCountries = async(req, res) => {
    try {
        const countries = await sequelize.query(`SELECT * FROM paises`,
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            'msg': true,
            'data': countries
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const getCountriesOfRegion = async(req, res) => {
    const { idRegion } = req.params;
    try {
        const countries = await sequelize.query(
            `SELECT * FROM paises WHERE idRegion = ${idRegion}`,
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            'msg': true,
            'data': countries
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const postCountriesOfRegion = async(req, res) => {
    const { idRegion } = req.params;
    const { nombre } = req.body;
    try {
        const region = await sequelize.query(`SELECT nombre FROM regiones WHERE idRegion = ${idRegion}`,
            {type: sequelize.QueryTypes.SELECT}
        );
        if(!region[0]) throw new Error('Region invalida');
        if(!nombre) throw new Error('campos requeridos vacios');
        const result = await sequelize.query(
            `INSERT INTO paises(nombre, idRegion) VALUES ('${nombre}', ${idRegion});`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(result[1] == 0) throw new Error(400);
        return res.status(201).json({
            'msg': true,
            'data': `El pais: ${nombre}, ha sido registrado exitosamente en la region ${region[0].nombre}.`
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const updateCountry = async(req,res) => {
    const { idCountry } = req.params;
    const { nombre } = req.body;
    try {
        const resultUpdate = sequelize.query(
            `UPDATE paises SET nombre = '${nombre}' WHERE idPais = ${idCountry}`,
            {type: sequelize.QueryTypes.UPDATE}
        );
        if(resultUpdate[1] == 0) throw new Error(400);
		return res.status(201).json({
	            'msg': true,
	            'data': 'Pais actualizada con exito'
	        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const deleteCountry = async(req, res) => {
    const {idCountry} = req.query;
    try {
        const pais = await deleteScript(idCountry);
		return res.status(200).json( {
	        'msg': true,
	        'data': `El pais ${pais[0].nombre} se ha eliminado con exito`
	    });
    } catch (error) {
        error.message = parseInt(error.message.split(':')[1]);
        errorResponse(res, error);
    }
};

module.exports = {
    getCountries,
    getCountriesOfRegion,
    postCountriesOfRegion, 
    updateCountry,
    deleteCountry
};