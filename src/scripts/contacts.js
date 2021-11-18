import { addContactDisplay, addContactHidden } from "../events/contacts.js";
import { dataTable, registerContact } from "../utils/contacts.js";

const table = document.getElementById('table-contacts');
const btnLogout = document.getElementById('logout');
const addContactSection = document.getElementById('add-contact');
const addContactButton = document.getElementById('add-contact-button');
const cancelAddContact = document.getElementById('cancel-add-contact');
const registerContactButton = document.getElementById('register-contact');

dataTable(table,btnLogout);
addContactDisplay(addContactButton,addContactSection);
addContactHidden(cancelAddContact,addContactSection);

registerContactButton.addEventListener('click', ()=> {
    const data = {
        nombre: document.getElementById('name').value, 
        apellido: document.getElementById('last-name').value, 
        cargo: document.getElementById('job').value, 
        email: document.getElementById('email').value, 
        interes: document.getElementById('range-select').value, 
        direccion: document.getElementById('address').value, 
        idCompany: document.getElementById('company').value, 
        idCiudad: 1, 
        redes: [
            {
                canal: "likedin",
                url: "linkedin.in/in"
            }
        ]
    };
    console.table(data);
    /* registerContact(data,cancelAddContact); */
});