/* Conexion BD */
const sequelize = require('../config/conexion.js');

const getListRegions = async(req, res) => {
    const list = await sequelize.query(
        'SELECT r.nombre AS region, p.nombre AS pais, c.nombre AS ciudad FROM regiones r JOIN paises p ON r.idRegion = p.idRegion JOIN ciudades c ON c.idPais = p.idPais',
        {type: sequelize.QueryTypes.SELECT}
    );
    return res.status(200).json({
        'msg': true,
        'data': list
    });
};

const getRegions = async(req, res) => {
    try {
        const regions = await sequelize.query(
            'SELECT * FROM regiones',
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

const deleteRegion = async(req, res) => {
    const {idRegion} = req.query;
    try {
        const region = await sequelize.query(
            `SELECT nombre FROM regiones WHERE idRegion = ${idRegion}`, 
            { type: sequelize.QueryTypes.SELECT }
        );
        if(!region) throw new Error();
        const paises = await sequelize.query(
            `SELECT idPais FROM Paises WHERE idRegion = ${idRegion}`, 
            { type: sequelize.QueryTypes.SELECT }
        );
        if(paises.lenght != 0) paises.forEach( async({idPais}) => {
            await sequelize.query(
                `DELETE FROM ciudades WHERE idPais = ${idPais}`,
			    { type: sequelize.QueryTypes.DELETE }
            );
        });
        await sequelize.query(
            `DELETE FROM paises WHERE idRegion = ${idRegion}`,
			{ type: sequelize.QueryTypes.DELETE }
        );
        await sequelize.query(
            `DELETE FROM regiones WHERE idRegion = ${idRegion}`,
					{ type: sequelize.QueryTypes.DELETE }
            );
		return res.status(200).json( {
	        'msg': true,
	        'data': `La region ${region[0].nombre} se ha eliminado con exito`
	    });
    } catch (error) {
        res.status(400).json({
            msg: "bad request"
        });
    }
};

module.exports = { 
    getRegions,
    postRegion,
    updateRegion,
    deleteRegion,
    getListRegions
};