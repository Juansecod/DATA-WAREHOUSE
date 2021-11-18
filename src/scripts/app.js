import eventLogout from "../events/logout.js";
const view = (window.location.pathname.split('/')[2] == 'pages') ? window.location.pathname.split('/')[3] : window.location.pathname.split('/')[2];
const btnLogout = document.getElementById('logout');

// Condicional de loggeo 
if(token == undefined && view != 'index.html' ) window.location.replace("./index.html");

if(btnLogout) eventLogout(btnLogout);
