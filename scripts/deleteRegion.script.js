const { deleteData } = require('./delete.script');
const deleteCountries = require('./deleteCountries.script');

const deleteRegion = async(idRegion) => {
    try {
        const region = await sequelize.query(
            `SELECT nombre FROM regiones WHERE idRegion = ${idRegion}`, 
            { type: sequelize.QueryTypes.SELECT }
        );
        if(!region[0]) throw new Error('404');
        await deleteCountries.region(idRegion);
        await deleteData('regiones','idRegion',idRegion);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    deleteRegion
};