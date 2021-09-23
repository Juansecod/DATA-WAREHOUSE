const sequelize = require('../config/conexion');
const {deleteData} = require('./delete.script');
const deleteCompanies = require('./deleteCompanies.script');
const deleteContacts = require('./deleteContacts.script');

const deleteCities = {
    country: async(idPais) => {
        try {
            const ciudades = await sequelize.query(
                `SELECT idCiudad FROM ciudades WHERE idPais=${idPais}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(ciudades.lenght != 0) ciudades.forEach( async({idCiudad}) => {
                try {
                    await deleteContacts.city(idCiudad);
                    await deleteCompanies.city(idCiudad);
                } catch (error) {
                    throw new Error(error);
                }
            });
            await deleteData('ciudades','idPais',idPais);
        } catch (error) {
            throw new Error(error);
        }
    },
    city: async(idCity) => {
        try {
            const ciudad = await sequelize.query(
                `SELECT nombre FROM ciudades WHERE idCiudad=${idCity}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(!ciudad[0]) throw new Error('404');
            await deleteContacts.city(idCity);
            await deleteCompanies.city(idCity);
            await deleteData('ciudades','idCiudad',idCity);
            return ciudad;
        } catch (error) {
            throw new Error(error);
        }
    }
};

module.exports = deleteCities;