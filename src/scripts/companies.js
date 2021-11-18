import { dataTable, registerCompany } from "../utils/companies.js";
import { addCompanyDisplay, addCompanyHidden } from "../events/companies.js";
import { eventInputs } from "../events/inputs.js";

const table = document.getElementById('table-companies');
const addCompanyButton = document.getElementById('add-company-button');
const addCompanySection = document.getElementById('add-company');
const cancelAddCompany = document.getElementById('cancel-add-company');
const email = document.getElementById('email');
const name = document.getElementById('name');
const registerCompanyButton = document.getElementById('register-company');

dataTable(table);
addCompanyDisplay(addCompanyButton, addCompanySection);
addCompanyHidden(cancelAddCompany, addCompanySection);
eventInputs(email,'email');
eventInputs(name);

registerCompanyButton.addEventListener('click', ()=> {
    const data = {
        nombre: name.value,
        email: email.value,
        telefono: document.getElementById('phone').value,
        idCiudad: document.getElementById('city').value,
        direccion: document.getElementById('address').value
    };
    console.table(data);
    /* registerCompany(data,cancelAddCompany); */
}); 