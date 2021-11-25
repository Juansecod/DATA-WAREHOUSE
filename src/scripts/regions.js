import { eventInputs } from "../events/inputs.js";
import { formDisplay, formHidden } from "../events/regions.js";
import { errorForm } from "../utils/global.js";
import { dataDisplay, registerCity, registerCountry, registerRegion, updateRegion, updateCountry, updateCity } from "../utils/regions.js";

const regions = document.getElementById('regions');
const addRegionButton = document.getElementById('add-region-button');
const cancelAddRegion = document.getElementById('cancel-add-region');
const cancelAddCountry = document.getElementById('cancel-add-country');
const cancelAddCity = document.getElementById('cancel-add-city');
const formRegion = document.getElementById('add-region');
const formCountry = document.getElementById('add-country');
const formCity = document.getElementById('add-city');
const nameRegion = document.getElementById('name-region');
const nameCountry = document.getElementById('name-country');
const nameCity = document.getElementById('name-city');
const registerRegionButton = document.getElementById('register-region');
const registerCountryButton = document.getElementById('register-country');
const registerCityButton = document.getElementById('register-city');
const updateRegionButton = document.getElementById('update-region');
const updateCountryButton = document.getElementById('update-country');
const updateCityButton = document.getElementById('update-city');

dataDisplay(regions);

// Eventos regiones
addRegionButton.addEventListener('click',()=>{
    document.getElementById('register-region').style.display = '';
    document.getElementById('update-region').style.display = 'none';
    document.getElementById('title-region').textContent = 'Nueva Region';
    document.getElementById('name-region').classList = 'required';
    document.getElementById('name-region').value = '';
});
formDisplay(addRegionButton, formRegion);
formHidden(cancelAddRegion, formRegion, 'region');
eventInputs(nameRegion);

// Eventos paises
formHidden(cancelAddCountry, formCountry, 'country');
eventInputs(nameCountry);

// Eventos ciudades
formHidden(cancelAddCity, formCity, 'city');
eventInputs(nameCity);







registerRegionButton.addEventListener('click', ()=> {
    const nombre = document.getElementById('name-region'); 
    if(nombre.value.length > 0 ) {
        registerRegion({nombre: nombre.value},cancelAddRegion);
    }else{
        errorForm('Revisa que esten completos los campos requeridos','error-info-region','text-error-region');
    } 
}); 

registerCountryButton.addEventListener('click', ()=> {
    const nombre = document.getElementById('name-country'); 
    if(nombre.value.length > 0 ) {
        registerCountry(registerCountryButton.dataset.id, {nombre: nombre.value}, cancelAddCountry);
    }else{
        errorForm('Revisa que esten completos los campos requeridos','error-info-country','text-error-country');
    } 
}); 

registerCityButton.addEventListener('click', ()=> {
    const nombre = document.getElementById('name-city'); 
    if(nombre.value.length > 0 ) {
        registerCity(registerCityButton.dataset.id, {nombre: nombre.value}, cancelAddCountry);
    }else{
        errorForm('Revisa que esten completos los campos requeridos','error-info-city','text-error-city');
    } 
}); 

updateRegionButton.addEventListener('click', ()=> {
    const nombre = document.getElementById('name-region').value; 
    if(nombre.length > 0 ) {
        updateRegion(updateRegionButton.getAttribute('id-region'),{nombre: nombre},cancelAddRegion);
    }else{
        errorForm('Revisa que esten completos los campos requeridos','error-info-region','text-error-region');
    } 
}); 

updateCountryButton.addEventListener('click', ()=> {
    const nombre = document.getElementById('name-country').value; 
    if(nombre.length > 0 ) {
        updateCountry(updateCountryButton.getAttribute('id-country'), {nombre: nombre}, cancelAddCountry);
    }else{
        errorForm('Revisa que esten completos los campos requeridos','error-info-country','text-error-country');
    } 
}); 

updateCityButton.addEventListener('click', ()=> {
    const nombre = document.getElementById('name-city').value; 
    if(nombre.length > 0 ) {
        updateCity(updateCityButton.getAttribute('id-city'), {nombre: nombre}, cancelAddCity);
    }else{
        errorForm('Revisa que esten completos los campos requeridos','error-info-city','text-error-city');
    } 
});

export {formCountry, formCity};