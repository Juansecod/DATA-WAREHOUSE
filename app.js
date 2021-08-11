const express = require('express');
const app = express();
const port = 3001;
const sequelize = require('./config/conexion');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = `/api/v1`;

// Configuracion inicial para tener un usuario administrativo por defecto, se recomienda el cambio de contraseña al ingresarlo, o eliminarlo pero 
const inicializacion = async(sequelize) => {
    try {
        const result = await sequelize.query('SELECT idUsuario FROM usuarios WHERE idRol = 1 LIMIT 1', 
            {type:sequelize.QueryTypes.SELECT});
        if(!result[0]) {
             sequelize.query(`INSERT INTO usuarios(email, nombre, apellido, contrasena, idRol)  
                VALUES('admin@mail.com', '', '', '${bcrypt.hashSync('admin', 10)}', 1);`,
                { type: sequelize.QueryTypes.INSERT }); 
            console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
            console.log('  Bienvenido a Data WareHouse! En caso de requerir acceso a las propiedades administrativas ingrese los siguientes campos en el login:                                                    \n');
            console.log(`                                  email: 'admin@mail.com'                                                                                                                                          \n`);            
            console.log(`                                  contrasena: 'admin'                                                                                                                                     \n`);               
            console.log('  Para loggearse correctamente se recomienda la lectura de la documentacion. Para mayor seguridad asegurarse de cambiar la contraseña de este usuario, o en su defecto, eliminarlo.       \n');
            console.log(`  En caso de un incidente al borrar por completo los usuarios de la base de dato se crea como defecto el usuario administrativo 'admin'.                                                  \n`);
            console.log(`  Asegurarse de crear un usuario y cambiar su rol de cliente con la cuenta default a administrativo para no tener fallos en el programa!!!!                                               `);
            console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
        }
    } catch (error) {
        console.log(error);
    }
};
inicializacion(sequelize);

// Routes
const usersRoutes = require('./routers/users.routers');
const companiesRoutes = require('./routers/companies.routers');
const contactsRoutes = require('./routers/contacts.routers');
const regionsRoutes = require('./routers/regions.routers');

// Middleware Globales
app.use(express.json());
app.use(cors());

// Routes use
app.use(`${path}/users`, usersRoutes);
app.use(`${path}/companies`, companiesRoutes);
app.use(`${path}/contacts`, contactsRoutes);
app.use(`${path}/regions`, regionsRoutes);

app.listen(port,()=>{
    console.log(`Servidor montado en el puerto ${port}`);
});