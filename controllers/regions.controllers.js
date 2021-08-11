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

const updateRegion = async(req,res) => {

};

module.exports = { 
    getRegions, 
    updateRegion 
};