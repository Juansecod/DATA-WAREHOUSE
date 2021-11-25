/* Conexion BD */
const sequelize = require('../config/conexion.js');
const { redesValidator } = require('../middleware/validators/redes.validator');
const { emailValidator } =  require('../middleware/validators/mail.validator');
const { contact:deleteScript } = require('../scripts/deleteContacts.script');
const errorResponse = require('../error/error');

const getContacts = async(req,res) => {
    try {
        const contacts = await sequelize.query(
            `SELECT cont.idContacto, cont.nombre, cont.apellido, cont.cargo, cont.email, cont.interes, comp.idCompania, comp.nombre AS compania, ciu.idCiudad, ciu.nombre AS ciudad, cont.direccion 
            FROM contactos AS cont JOIN ciudades AS ciu ON ciu.idCiudad = cont.idCiudad 
            JOIN companias AS comp ON comp.idCompania = cont.idCompania;`,
            {type: sequelize.QueryTypes.SELECT}
        );
        res.status(200).json({
            msg: true, 
            data: contacts
        });
    }catch (error) {
        errorResponse(res, error);
    }
};

const postContact = async(req,res) => {
    const { nombre, apellido, cargo, email, interes = 0, direccion, idCompany, idCiudad, redes } = req.body;
    try { 
        if(!redesValidator(redes) && redes.lenght > 0) throw new Error('Formato de redes invalido');
        if(!emailValidator(email)) throw new Error('Formato email invalido');
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
        if(resultInsert[1] == 0) throw new Error(400);
        /* Registro Redes Contacto */
        const idContact = resultInsert[0];
        if(redes.lenght > 0) redes.forEach(async({ canal, url, telefono, preferencia = 'Sin Preferencia' })=>{
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
            data: `Se ha regitrado a ${nombre} ${apellido} con exito. Este contacto pertenece a la compañia ${company[0].nombre} y reside en la ciudad ${city[0].nombre}`
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

const putContact = async(req,res) =>{
    const { id:idContact } = req.params;
    const { nombre, apellido, cargo, email, interes, direccion, idCompany, idCiudad, redes } = req.body;
    try {
        let sql = 'UPDATE contactos SET';
		let valores = '';
        if (nombre != undefined) valores = valores + ` nombre = '${nombre}'`;
		if (apellido != undefined) valores = valores + `, apellido = '${apellido}'`;
        if (cargo != undefined) valores = valores + `, cargo = '${cargo}'`;
        if((email != undefined) && !emailValidator(email)) throw new Error('Formato email invalido');
        if((email != undefined) && emailValidator(email)) valores = valores + `, email = '${email}'`;
        if (interes != undefined) valores = valores + `, interes = ${interes}`;
        if (direccion != undefined) valores = valores + `, direccion = '${direccion}'`;
        if (idCompany != undefined) valores = valores + `, idCompania = ${idCompany}`;
        if (idCiudad != undefined) valores = valores + `, idCiudad = ${idCiudad}`;
        
        if (valores[0] == ",") valores = valores.replace(",","");
		
		const sentenciaSQL = sql + valores + ` WHERE idContacto = ${idContact}`;

        let resultUpdate = await sequelize.query(`${sentenciaSQL};`,
	        { type: sequelize.QueryTypes.UPDATE });

		if(resultUpdate[1] == 0) throw new Error(400);
		
        if(redes != undefined) redes.forEach(async({ canal, url, telefono, preferencia, idRedContacto })=>{
            let sql = 'UPDATE redesContacto SET';
		    let valores = '';   
            if (canal != undefined) valores = valores + ` canal = '${canal}'`;
            if (url != undefined) valores = valores + `, url = '${url}'`;
            if (telefono != undefined) valores = valores + `, telefono = '${telefono}'`;
            if (preferencia != undefined) valores = valores + `, preferencia = '${preferencia}''`;
            if (valores[0] == ",") valores = valores.replace(",","");
            const sentenciaSQL = sql + valores + ` WHERE idRedContacto = ${idRedContacto}`;
            await sequelize.query(`${sentenciaSQL};`, { type: sequelize.QueryTypes.UPDATE });
        });

		return res.status(201).json({
            msg: true,
            data: 'Contacto actualizado con exito'
	    });
    } catch (error) {
        errorResponse(res, error);
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
        errorResponse(res, error);
    }
};

const addRedContact = async(req, res) => {
    const { id:idContact } = req.params;
    const { redes } = req.body;
    try {
        const contact = await sequelize.query(
            `SELECT nombre FROM contactos WHERE idContacto=${idContact}`,
            {type: sequelize.QueryTypes.SELECT}
        );
        if(!contact[0]) throw new Error(400);
        redes.forEach(async({ canal, url, telefono, preferencia = 'Sin Preferencia'})=>{
            try {
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
            } catch (error) {
                throw new Error(400);
            }
        });
        res.status(201).json({
            msg: true,
            data: `Se ha agregado las redes del contacto ${contact[0].nombre}.`
        });
    } catch (error) {
        errorResponse(res, error);
    }
};

module.exports = {
    getContacts,
    postContact,
    putContact,
    deleteContact,
    addRedContact
};
