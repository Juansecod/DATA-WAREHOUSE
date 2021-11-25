/* Condicional de sesion existente */
if(token != undefined) window.location.replace("./contactos.html");

import { eventGenLogin } from "../events/login.js";
import { eventInputs } from "../events/inputs.js";

const btnLogin = document.getElementById('submit-login');
const inputEmail = document.getElementById('email');
const inputContrasena = document.getElementById('password');

eventInputs(inputEmail, 'email');
eventInputs(inputContrasena, 'password');
eventGenLogin(btnLogin);