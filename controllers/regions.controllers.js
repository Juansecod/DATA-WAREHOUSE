/* Conexion BD */
const sequelize = require('../config/conexion.js');
const { deleteRegion:deleteScript } = require('../scripts/deleteRegion.script');
const errorResponse = require('../error/error');

const getListRegions = async(req, res) => {
    try {
        const list = await sequelize.query(
            'SELECT r.nombre AS region, p.nombre AS pais, c.nombre AS ciudad FROM regiones r JOIN paises p ON r.idRegion = p.idRegion JOIN ciudades c ON c.idPais = p.idPais',
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            msg: true,
            data: list
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const getRegions = async(req, res) => {
    try {
        const regions = await sequelize.query(
            'SELECT * FROM regiones',
            {type: sequelize.QueryTypes.SELECT}
        );
        return res.status(200).json({
            msg: true,
            data: regions
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const postRegion = async(req, res) => {
    const { nombre } = req.body;
    try {
        if(!nombre) throw new Error(400);
        const result = await sequelize.query(
            `INSERT INTO regiones(nombre) VALUES ('${nombre}');`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(result[1] == 0) throw new Error(400);
        return res.status(201).json({
            msg: true,
            data: `La region: ${nombre}, ha sido registrada exitosamente`
        });
    } catch (error) {
        errorResponse(res, error);
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
        if(resultUpdate[1] == 0) throw new Error(400);
		return res.status(201).json({
	            msg: true,
	            data: `Region actualizada con exito`
	        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const deleteRegion = async(req, res) => {
    const {idRegion} = req.query;
    try {
        deleteScript(idRegion);
		return res.status(200).json( {
	        msg: true,
	        data: `La region ${region[0].nombre} se ha eliminado con exito`
	    });
    } catch (error) {
        errorResponse(res, error);
    }
};

module.exports = { 
    getRegions,
    getListRegions,
    postRegion,
    updateRegion,
    deleteRegion
};