/* Conexion BD */
const sequelize = require('../config/conexion.js');

const getRegions = async(req, res) => {
    try {
        const regions = await sequelize.query(`SELECT * FROM regiones`,
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            'msg': true,
            'data': regions
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

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
        console.log(error);
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

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
        console.log(error);
        res.status(400).json({
            msg: "Bad request"
        });
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
        console.log(error);
        res.status(400).json({
            msg: 'algo ha salido mal'
        });
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
        console.log(error);
        res.status(400).json({
            msg: 'algo ha salido mal'
        });
    }
};

const postRegion = async(req, res) => {
    const { nombre } = req.body;
    try {
        if(!nombre) throw new Error('campos requeridos vacios');
        const result = await sequelize.query(
            `INSERT INTO regiones(nombre) VALUES ('${nombre}');`,
            {type: sequelize.QueryTypes.INSERT}
        );
        return res.status(201).json({
            'msg': true,
            'data': `La region: ${nombre}, ha sido registrada exitosamente`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'algo ha salido mal'
        });
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
        return res.status(201).json({
            'msg': true,
            'data': `El pais: ${nombre}, ha sido registrado exitosamente en la region ${region[0].nombre}.`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'algo ha salido mal'
        });
    }
};

const updateRegion = async(req,res) => {
    const { idRegion } = req.params;
    const { nombre } = req.body;
    try {
        const resultUpdate = sequelize.query(
            `UPDATE regiones SET nombre = '${nombre}' WHERE idRegion = ${idRegion}`,
            {type: sequelize.QueryTypes.UPDATE}
        );
        if(resultUpdate[1] == 0) throw new Error('400');
		return res.status(201).json({
	            'msg': true,
	            'data': `Region actualizada con exito`
	        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'algo ha salido mal'
        });
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
        if(resultUpdate[1] == 0) throw new Error('400');
		return res.status(201).json({
	            'msg': true,
	            'data': `Region actualizada con exito`
	        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'algo ha salido mal'
        });
    }
};

const deleteRegion = async(req, res) => {
    const {idRegion} = req.query;
    try {
        const result = await sequelize.query(
            `SELECT * FROM regiones WHERE idRegion = ${idRegion}}`, 
            { type: sequelize.QueryTypes.SELECT }
        );
        if(!result) throw new Error();
        const resultDelete = await sequelize.query(
            `DELETE FROM regiones WHERE idRegion = ${idRegion}`,
					{ type: sequelize.QueryTypes.DELETE }
            );
        console.log(resultDelete);
		return res.status(200).json( {
	        'msg': true,
	        'data': `Region eliminado con exito`
	    });
    } catch (error) {
        res.status(400).json({
            msg: "bad request"
        });
    }
};

const deleteCountry = async(req, res) => {
    const {idCountry} = req.query;
    try {
        const result = await sequelize.query(
            `SELECT * FROM paises WHERE idPais=${idCountry}}`, 
            { type: sequelize.QueryTypes.SELECT }
        );
        if(!result) throw new Error();
        const resultDelete = await sequelize.query(
            `DELETE FROM paises WHERE idPais = ${idCountry}`,
			{ type: sequelize.QueryTypes.DELETE }
        );
        console.log(resultDelete);
		return res.status(200).json( {
	        'msg': true,
	        'data': `Region eliminado con exito`
	    });
    } catch (error) {
        res.status(400).json({
            msg: "bad request"
        });
    }
};

module.exports = { 
    getRegions,
    getCountries, 
    getCities,
    getCountriesOfRegion,
    getCitiesesOfCountry,
    postRegion,
    postCountriesOfRegion, 
    updateRegion,
    updateCountry,
    deleteRegion,
    deleteCountry
};