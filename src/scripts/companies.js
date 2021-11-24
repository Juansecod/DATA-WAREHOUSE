import { dataTable, registerCompany } from "../utils/companies.js";
import { addCompanyDisplay, addCompanyHidden } from "../events/companies.js";
import { eventInputs, eventSelect } from "../events/inputs.js";
import { errorForm, insertOptionsSelect, sortArray } from "../utils/global.js";
import SessionStorage from "./app.js";

const table = document.getElementById('table-companies');
const addCompanyButton = document.getElementById('add-company-button');
const addCompanySection = document.getElementById('add-company');
const cancelAddCompany = document.getElementById('cancel-add-company');
const email = document.getElementById('email');
const name = document.getElementById('name');
const city = document.getElementById('city');
const registerCompanyButton = document.getElementById('register-company');


dataTable(table);

// render opciones select ciudad
let citiesDatabase = new SessionStorage().get('cities');
sortArray(citiesDatabase);
citiesDatabase.forEach((data)=>{
    insertOptionsSelect(data,city);
});

// eventos
addCompanyDisplay(addCompanyButton, addCompanySection);
addCompanyHidden(cancelAddCompany, addCompanySection);
eventInputs(email,'email');
eventInputs(name);
eventSelect(city);

registerCompanyButton.addEventListener('click', () => {
    const data = {
        nombre: name.value,
        email: email.value,
        idCiudad: parseInt(city.value),
        telefono: document.getElementById('phone').value || undefined,
        direccion: document.getElementById('address').value || undefined
    };
    const positionAt = email.value.search('@');
    const positionDot = email.value.search('.com');
    if(name.value.length > 0 && positionAt > 0 && positionDot > 1 && city.value != '') {
        registerCompany(data,cancelAddCompany);
    }else{
        errorForm('Revisa que esten completos los campos requeridos');
    } 
}); 