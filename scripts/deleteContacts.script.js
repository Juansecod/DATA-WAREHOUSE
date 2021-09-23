const sequelize = require('../config/conexion');
const { deleteData } = require('./delete.script');

const deleteContacts = {
    city: async(idCiudad) => {
            try {
                const contactsCity = await sequelize.query(
                    `SELECT idContacto FROM contactos WHERE idCiudad=${idCiudad}`,
                    {type: sequelize.QueryTypes.SELECT}
                );
                if(contactsCity.lenght != 0) contactsCity.forEach(async({idContacto}) => {
                    try{
                        await deleteData('redesContacto', 'idContacto', idContacto);
                    }catch(error){
                        throw new Error(error);
                    }
                });
                await deleteData('contactos', 'idCiudad', idCiudad);
            } catch (error) {
                throw new Error(error);
            }
    },
    company: async(idCompania) => {
        try {
            const contacts = await sequelize.query(
                `SELECT idContacto FROM contactos WHERE idCompania=${idCompania}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(contacts.lenght != 0) contacts.forEach(async({idContacto}) => {
                try {
                    await deleteData('redesContacto', 'idContacto', idContacto);
                } catch (error) {
                    throw new Error(error);
                }
            });
            await deleteData('contactos', 'idCompania', idCompania);
        } catch (error) {
            throw new Error(error);
        }
    },
    contact: async(idContacto) => {
        try {
            const contact = await sequelize.query(
                `SELECT idContacto FROM contactos WHERE idContacto = ${idContacto}`, 
                { type: sequelize.QueryTypes.SELECT }
            );
            if(!contact[0]) throw new Error('Contacto no existente');
            await deleteData('redesContacto','idContacto',idContacto);
            await deleteData('contactos','idContacto',idContacto);
        } catch (error) {
            throw new Error(error);
        }
        
    }
};

module.exports = deleteContacts;