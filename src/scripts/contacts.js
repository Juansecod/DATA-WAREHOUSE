import { addContactDisplay, addContactHidden } from "../events/contacts.js";
import { dataTable, registerContact, updateContact, deleteContact } from "../utils/contacts.js";
import SessionStorage from "./app.js";
import { insertOptionsSelect,errorForm } from '../utils/global.js';
import { eventInputs, eventSelect } from "../events/inputs.js";
import { getData } from "../utils/fetchFunctions.js";
import { routesCompanies } from "../utils/routes.js";
import { formNetwork } from "../models/contacts.js";

const table = document.getElementById('table-contacts');
const btnLogout = document.getElementById('logout');
const addContactSection = document.getElementById('add-contact');
const addContactButton = document.getElementById('add-contact-button');
const cancelAddContact = document.getElementById('cancel-add-contact');
const registerContactButton = document.getElementById('register-contact');
const selectRegion = document.getElementById('region');
const selectCountry =  document.getElementById('pais');
const selectCity =  document.getElementById('ciudad');
const address = document.getElementById('address');
const company =  document.getElementById('company');
const interestRangeInput = document.getElementById('interest');
const interestSelect = document.getElementById('range-select');
const nombre = document.getElementById('name');
const apellido = document.getElementById('last-name');
const email = document.getElementById('email');
const cargo = document.getElementById('job');
const containerFormNetworks = document.getElementById('network-container');
const btnAddNetwork = document.getElementById('add-network-form');
const containerBtn = document.getElementById('container-button');
const displayContSelect = document.getElementById('amount');
const selectAllContacts = document.getElementById('select-all-contacts');
const selects = document.getElementsByName('select-contact');
const btnBulkDelete = document.getElementById('bulk-delete');
const updateContactButton = document.getElementById('update-contact');

var contForm = 1;

dataTable(table, btnLogout, displayContSelect);

async function renderOptionsCompanies(){
    await getData(routesCompanies.get, token)
        .then((res)=>{
            if(!res.msg) throw new Error(res.data);
            res.data.forEach(({idCompania: id, nombre}) => {
                const company = new SessionStorage({id, nombre},'companies');
                company.set('companies');
            });
        })
        .catch((err)=> {
            console.error(err);
        });
    const companiesDatabase = new SessionStorage().get('companies');
    companiesDatabase.forEach((data)=>{
        insertOptionsSelect(data,company);
    });
}
renderOptionsCompanies();

const regionsDatabase = new SessionStorage().get('regions');
regionsDatabase.forEach((region)=>{
    insertOptionsSelect(region,selectRegion);
});

const countriesDatabase = new SessionStorage().get('countries');
selectRegion.addEventListener("change", ()=>{
    selectCountry.classList = '';
    selectCountry.disabled = false;
    selectCountry.innerHTML = '<option disabled selected hidden>Seleccione un pais</option>';
    const countriesByRegion = [];
    countriesDatabase.forEach((country) => {
        if(country.idRegion==selectRegion.value) countriesByRegion.push(country);
    });
    countriesByRegion.forEach((country) => {
        insertOptionsSelect(country,selectCountry);
    });
    selectCity.classList = 'disabled';
    selectCity.disabled = true;
    selectCity.innerHTML = '<option disabled selected hidden>Seleccione una ciudad</option>';
    address.disabled = true;
    address.classList = 'disabled';
});

const citiesDatabase = new SessionStorage().get('cities');
selectCountry.addEventListener("change", ()=>{
    address.disabled = true;
    address.classList = 'disabled';
    selectCity.classList = '';
    selectCity.disabled = false;
    selectCity.innerHTML = '<option disabled selected hidden value="">Seleccione una ciudad</option>';
    const citiesByCountry = [];
    citiesDatabase.forEach((city) => {
        if(city.idPais==selectCountry.value) citiesByCountry.push(city);
    });
    citiesByCountry.forEach((city) => {
        insertOptionsSelect(city,selectCity);
    });
});

selectCity.addEventListener("change",()=>{
    address.classList = '';
    address.disabled = false;
});

selectAllContacts.addEventListener('click',function(){
    let contSelect = (this.checked) ? selects.length : 0;
    document.getElementById('container-bulk-delete').style.display = (contSelect == 0) ? 'none' : 'inline-block';
    selects.forEach((input)=>{
        input.checked = (this.checked) ? true : false;
    });
    displayContSelect.textContent = `${contSelect} seleccionados`;
});

btnBulkDelete.addEventListener('click',()=>{
    const idArray = [];
    let contSelect = 0;
    selects.forEach(({value,checked})=>{
        if(checked) contSelect = contSelect + 1;
        if(checked) idArray.push(value);
    });
    const confirm = window.confirm(`Esta seguro que quire eliminar a ${contSelect} contactos`);
    if(confirm) deleteContact(idArray);
});

btnAddNetwork.addEventListener('click',()=>{
    containerFormNetworks.removeChild(containerBtn);
    const newForm = document.createElement('div');
    newForm.classList = 'form-network';
    newForm.innerHTML = formNetwork(contForm);
    containerFormNetworks.appendChild(newForm);
    containerFormNetworks.appendChild(containerBtn);
    
    const selectChannel = document.getElementById(`channel-${contForm}`);
    const nickContact = document.getElementById(`nick-channel-contact-${contForm}`);
    const preferences = document.getElementById(`preferences-${contForm}`);
    selectChannel.addEventListener("change",()=>{
        nickContact.classList = '';
        nickContact.disabled = false;
        preferences.classList = '';
        preferences.disabled = false;
    });

    contForm = contForm + 1;
});

addContactButton.addEventListener('click',()=>{
    document.getElementById('icon-info').style.display = '';
    document.getElementById('info').style.display = '';
    document.getElementById('register-contact').style.display = '';
    document.getElementById('update-contact').style.display = 'none';
    document.getElementById('network-container').style.display = '';
    document.getElementById('network-container').style.display = '';
    document.getElementById('title').textContent = 'Nuevo Contacto';
    document.getElementById('name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('job').value = '';
    document.getElementById('email').value = '';
    document.getElementById('company').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('address').value = '';
    document.getElementById('interest').value = 0;
    document.getElementById('range-select').value = 0;
});
addContactDisplay(addContactButton,addContactSection);
addContactHidden(cancelAddContact,addContactSection, containerFormNetworks, containerBtn);
cancelAddContact.addEventListener('click',() => contForm = 1);
eventInputs(email,'email');
eventInputs(nombre);
eventInputs(cargo);
eventInputs(apellido);
eventSelect(company);

interestSelect.addEventListener("change",()=>{
    interestRangeInput.value = interestSelect.value;
});

interestRangeInput.addEventListener('input',() => {
    document.getElementById(`${interestRangeInput.value}%`).selected = true;
});

const selectChannel = document.getElementById('channel-0');
const nickContact = document.getElementById('nick-channel-contact-0');
const preferences = document.getElementById('preferences-0');
selectChannel.addEventListener("change",()=>{
    nickContact.classList = '';
    nickContact.disabled = false;
    preferences.classList = '';
    preferences.disabled = false;
});

registerContactButton.addEventListener('click', ()=> {
    const data = {
        nombre: nombre.value, 
        apellido: apellido.value, 
        cargo: cargo.value, 
        email: email.value, 
        interes: interestSelect.value, 
        direccion: address.value, 
        idCompany: parseInt(company.value), 
        idCiudad: parseInt(selectCity.value),
        redes: [] 
    };
    for (let id = 0; id <= contForm;  id++) {
        const channel = document.getElementById(`channel-${id}`);
        if(!channel) break;
        const telefono = isNaN(document.getElementById(`nick-channel-contact-${id}`).value) ? undefined : document.getElementById(`nick-channel-contact-${id}`).value;
        const url = (!telefono) ? document.getElementById(`nick-channel-contact-${id}`).value : undefined;
        const preferencia = document.getElementById(`preferences-${id}`).value;
        if(channel.value != '') {
            let dataRedes = {
                canal: channel.value,
                url: url,
                telefono: telefono,
                preferencia: preferencia
            };
            data.redes.push(dataRedes);
        }
    }
    const positionAt = email.value.search('@');
    const positionDot = email.value.search('.com');
    if(nombre.value.length > 0 && positionAt > 0 && positionDot > 1 && cargo.value.length > 0 && apellido.value.length > 0 && company.value != '' && selectCity.value != '') {
        registerContact(data,cancelAddContact);
    }else{
        errorForm('Revisa que esten completos los campos requeridos');
    } 
});

updateContactButton.addEventListener('click', ()=> {
    const data = {
        nombre: nombre.value, 
        apellido: apellido.value, 
        cargo: cargo.value, 
        email: email.value, 
        interes: interestSelect.value, 
        direccion: address.value, 
        idCompany: parseInt(company.value) || undefined, 
        idCiudad: parseInt(selectCity.value) || undefined
    };
    const positionAt = email.value.search('@');
    const positionDot = email.value.search('.com');
    if(nombre.value.length > 0 && positionAt > 0 && positionDot > 1 && cargo.value.length > 0 && apellido.value.length > 0 && company.value != '') {
        updateContact(data,updateContactButton.getAttribute('id-contact'),cancelAddContact);
    }else{
        errorForm('Revisa que esten bien escritos todos los campos');
    } 
});