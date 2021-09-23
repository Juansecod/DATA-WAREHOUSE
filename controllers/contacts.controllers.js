/* Conexion BD */
const sequelize = require('../config/conexion.js');
const { redesValidator } = require('../middleware/validators/redes.validator');
const { contact:deleteScript } = require('../scripts/deleteContacts.script');

const getContacts = async(req,res) => {
    try {
        const contacts = await sequelize.query(
            `SELECT cont.idContacto, cont.nombre, cont.apellido, cont.cargo, cont.email, cont.interes, comp.idCompania, comp.nombre AS compania, ciu.idCiudad, ciu.nombre AS ciudad, cont.direccion, red.idRedContacto, red.canal, red.url AS link, red.telefono, red.preferencia 
            FROM contactos AS cont JOIN redesContacto AS red ON cont.idContacto = red.idContacto 
            JOIN ciudades AS ciu ON ciu.idCiudad = cont.idCiudad 
            JOIN companias AS comp ON comp.idCompania = cont.idCompania;`,
            {type: sequelize.QueryTypes.SELECT}
        );
        res.status(200).json({
            msg: true, 
            data: contacts
        });
    }catch (error) {
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

const postContact = async(req,res) => {
    const { nombre, apellido, cargo, email, interes = 0, direccion, idCompany, idCiudad, redes } = req.body;
    try { 
        if(!redesValidator(redes)) throw new Error('Formato de redes invalido');
        const company = await sequelize.query(
            `SELECT nombre FROM companias WHERE idCompania = ${idCompany}`,
            {type: sequelize.QueryTypes.SELECT}
        ); 
        if(!company[0]) throw new Error('Compañia no encontrada');
        const city = await sequelize.query(
            `SELECT nombre FROM ciudades WHERE idCiudad = ${idCiudad}`,
            {type: sequelize.QueryTypes.SELECT}
        ); 
        if(!city[0]) throw new Error('Ciudad no encontrada');
        const resultInsert = await sequelize.query(
            `INSERT INTO contactos(nombre, apellido, cargo, email, interes, direccion, idCompania, idCiudad) 
            VALUES ('${nombre}','${apellido}','${cargo}','${email}',${interes},'${direccion}',${idCompany},${idCiudad});`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(resultInsert[1] == 0) throw new Error("No se ha logrado registrar");
        /* Registro Redes Contacto */
        const idContact = resultInsert[0];
        redes.forEach(async({ canal, url, telefono, preferencia = 'Sin Preferencia' })=>{
            if(!url) return await sequelize.query(
                `INSERT INTO redesContacto(canal, telefono, preferencia, idContacto) 
                VALUES ('${canal}', '${telefono}', '${preferencia}', ${idContact});`,
                {type: sequelize.QueryTypes.INSERT}
            );
            if(!telefono) return await sequelize.query(
                `INSERT INTO redesContacto(canal, url, preferencia, idContacto) 
                VALUES ('${canal}', '${url}', '${preferencia}', ${idContact})`,
                {type: sequelize.QueryTypes.INSERT}
            );
        });
        res.status(200).json({
            msg: true,
            data: `Se ha regitrado a ${nombre} ${apellido} con exito. Este contacto pertenece a la compañia ${company} y reside en la ciudad ${city}`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

const putContact = async(req,res) =>{
    const { nombre, apellido, cargo, email, interes = 0, direccion, idCompany, idCiudad, redes } = req.body;
    try {
        throw new Error('No hay codigo aun');
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

const deleteContact = async(req,res) => {
    const { id:idContacto } = req.query;
    try{
        await deleteScript(idContacto);
        return res.status(200).json( {
	        msg: true,
	        data: 'Contacto eliminado con exito'
	    });
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

module.exports = {
    getContacts,
    postContact,
    putContact,
    deleteContact
};