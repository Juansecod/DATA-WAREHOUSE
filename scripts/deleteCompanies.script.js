const sequelize = require('../config/conexion');
const {deleteData} = require('./delete.script');
const deleteContacts = require('./deleteContacts.script');

const deleteCompanies = {
    city: async(idCiudad) => {
        try {
            const companies = await sequelize.query(
                `SELECT idCompania FROM companias WHERE idCiudad=${idCiudad}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(companies.lenght != 0) companies.forEach( async({idCompania}) => {
                try {
                    await deleteContacts.company(idCompania);
                } catch (error) {
                    throw new Error(error);
                }
            });
            await deleteData('companias','idCiudad',idCiudad);
        } catch (error) {
            throw new Error(error);
        }
    },
    company: async(idCompany) => {
        try {
            const company = await sequelize.query(
                `SELECT nombre FROM companias WHERE idCompania=${idCompany}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(!company[0]) throw new Error('404');
            await deleteContacts.company(idCompany);
            await deleteData('companias','idCompania',idCompany);
        } catch (error) {
            throw new Error(error);
        }
    }
};

module.exports = deleteCompanies;