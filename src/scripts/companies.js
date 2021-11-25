import { dataTable, registerCompany, updateCompany } from "../utils/companies.js";
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
const updateCompanyButton = document.getElementById('update-company');

dataTable(table);

// render opciones select ciudad
let citiesDatabase = new SessionStorage().get('cities');
sortArray(citiesDatabase);
citiesDatabase.forEach((data)=>{
    insertOptionsSelect(data,city);
});

// eventos
addCompanyButton.addEventListener('click', ()=> {
    document.getElementById('register-company').style.display = '';
    document.getElementById('update-company').style.display = 'none';
    document.getElementById('title').textContent = 'Nueva Compañia';
    document.getElementById('name').value = '';
    document.getElementById('name').classList = 'required';
    document.getElementById('email').value = '';
    document.getElementById('email').classList = 'required';
    document.getElementById('phone').value = '';
    document.getElementById('city').value = '';
    document.getElementById('city').classList = 'required';
    document.getElementById('address').value = '';
});
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

updateCompanyButton.addEventListener('click', ()=> {
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
        updateCompany(data,updateCompanyButton.getAttribute('id-company'),cancelAddCompany);
    }else{
        errorForm('Revisa que esten bien escritos todos los campos');
    } 
});