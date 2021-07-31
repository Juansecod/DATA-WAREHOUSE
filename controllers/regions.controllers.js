/* Conexion BD */
const sequelize = require('../config/conexion.js');


modelGenerator = (object) => {
    var model = `(`;
    if(!(!object.nombre)) model = model + `nombre, `;
    if(!(!object.apellido)) model = model + `apellido, `;
    if(!(!object.email)) model = model + ` email, `;
    if(!(!object.contrasena)) model = model + ` contrasena, `;
    model = model + ` idRol)`;
    console.log(model);
}
module.exports = {};