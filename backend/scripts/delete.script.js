const sequelize = require('../config/conexion.js');

module.exports = {
    deleteData: async(table,rowCondition,valueRow) => {
        try{
            await sequelize.query(
                `DELETE FROM ${table} WHERE ${rowCondition} = ${valueRow}`,
                { type: sequelize.QueryTypes.DELETE }
            );
        }catch(error){
            throw new Error(error);
        }
    }
};