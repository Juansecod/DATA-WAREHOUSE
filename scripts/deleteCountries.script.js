const sequelize = require('../config/conexion');
const { deleteData } = require('./delete.script');
const deleteCities = require('./deleteCities.script');

const deleteCountries = {
    region: async(idRegion) => {
        try {
            const paises = await sequelize.query(
                `SELECT idPais FROM paises WHERE idRegion = ${idRegion}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(paises.lenght != 0) paises.forEach( async({idPais}) => {
                try {
                    await deleteCities.country(idPais);
                } catch (error) {
                    throw new Error(error);
                }
            });
            await deleteData('paises','idRegion',idRegion);
        } catch (error) {
            throw new Error(error);
        }
    },
    country: async(idCountry) => {
        try {
            const pais = await sequelize.query(
                `SELECT nombre FROM paises WHERE idPais=${idCountry}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(!pais[0]) throw new Error('Pais no encontrado');
            await deleteCities.country(idCountry);
            await deleteData('paises','idPais',idCountry);
            return pais;
        } catch (error) {
            throw new Error(error);
        }
    }
};

module.exports = deleteCountries;