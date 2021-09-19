/* Conexion BD */
const sequelize = require('../config/conexion.js');
const { redesValidator } = require('../middleware/validators/redes.validator');

const getContacts = async(req,res) => {
    try {
        const contacts = await sequelize.query(
            'SELECT * FROM contactos',
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
    const { nombre, apellido, cargo, email, interes = 0, idCompany, redes } = req.body;
    try { 
        if(!redesValidator(redes)) throw new Error('Formato de redes invalido');
        const company = await sequelize.query(
            `SELECT nombre FROM companias WHERE idCompania = ${idCompany}`,
            {type: sequelize.QueryTypes.SELECT}
        ); 
        if(!company) throw new Error('Compañia no encontrada');
        const resultInsert = await sequelize.query(
            `INSERT INTO contactos(nombre, apellido, cargo, email, interes, idCompania) 
            VALUES ('${nombre}','${apellido}','${cargo}','${email}',${interes},${idCompany});`,
            {type: sequelize.QueryTypes.INSERT}
        );
        if(resultInsert[1] == 0) throw new Error("No se ha logrado registrar");
        /* Registro Redes Contacto */
        const idContact = resultInsert[0];
        redes.forEach(async({url, telefono})=>{
            if(!url) return await sequelize.query(
                `INSERT INTO redesContacto(telefono, idContacto) VALUES ('${telefono}', ${idContact})`,
                {type: sequelize.QueryTypes.INSERT}
            );
            if(!telefono) return await sequelize.query(
                `INSERT INTO redesContacto(url, idContacto) VALUES ('${url}', ${idContact})`,
                {type: sequelize.QueryTypes.INSERT}
            );
        });
        res.status(200).json({
            msg: true,
            data: `Se ha regitrado a ${nombre} ${apellido} con exito. Este contacto pertenece a la compañia ${company}`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

const deleteContact = async(req,res) => {
    const { idContacto } = req.query;
    try{
        const result = await sequelize.query(
            `SELECT * FROM contactos WHERE idContacto = ${idContacto}`, 
            { type: sequelize.QueryTypes.SELECT }
        );
        if(!result) throw new Error('Contacto no existente');
        await sequelize.query(
            `DELETE FROM redesContacto WHERE idContacto = ${idContacto}`,
            { type: sequelize.QueryTypes.DELETE }
        );
        await sequelize.query(
            `DELETE FROM contactos WHERE idContacto = ${idContacto}`,
		    { type: sequelize.QueryTypes.DELETE }
        );
        return res.status(200).json( {
	        'msg': true,
	        'data': 'Contacto eliminado con exito'
	    });
    }catch(error){
        res.status(400).json({
            msg: "Bad request"
        });
    }
};

module.exports = {
    getContacts,
    postContact,
    deleteContact
};