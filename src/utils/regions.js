import { routesRegions } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import * as models from "../models/regions.js";
import { generateDOM, errorAdmin, errorForm } from "./global.js";
import { formDisplay } from "../events/regions.js";
import { formCity, formCountry } from "../scripts/regions.js";

const dataDisplay = (container)=>{
    fetchFunctions.getData(routesRegions.regions.get)
        .then((res)=>{
            if(!res.msg) throw new Error(res.data);
            res.data.forEach((region) => {
                const {idRegion: id} = region;
                const containerRegion = generateDOM(region,container,models.regionInfo, 'div','container-region');
                
                const addCountry = document.getElementById(`add-country-button-${id}`);
                addCountry.addEventListener('click',()=>{
                    document.getElementById('register-country').style.display = '';
                    document.getElementById('update-country').style.display = 'none';
                    document.getElementById('title-country').textContent = 'Nuevo Pais';
                    document.getElementById('name-country').classList = 'required';
                    document.getElementById('name-country').value = '';
                });
                formDisplay(addCountry, formCountry, id, 'country');

                const edit = document.getElementById(`edit-region-${id}`);
                edit.addEventListener('click', () => {
                    formDisplay(edit,document.getElementById('add-region'));
                    document.getElementById('register-region').style.display = 'none';
                    document.getElementById('update-region').style.display = 'inline-block';
                    document.getElementById('title-region').textContent = 'Actualizar Region';
                    document.getElementById('name-region').classList = 'success';
                    document.getElementById('name-region').value = region.nombre;
                    document.getElementById('update-region').setAttribute('id-region', id);
                });
    
                const deleteBtn = document.getElementById(`delete-region-${id}`);
                deleteBtn.addEventListener('click', ()=> {
                    const confirm = window.confirm(`Esta seguro que quire eliminar la region ${region.nombre}`);
                    if(confirm) deleteRegion(id);
                });
                fetchFunctions.getData(routesRegions.countries.getByRegion(id))
                    .then((res)=>{
                        if(!res.msg) throw new Error(res.data);
                        res.data.forEach((pais) => {
                            const {idPais: id} = pais;
                            const containerCountry = generateDOM(pais,containerRegion,models.countryInfo, 'div','container-country');

                            const addCity = document.getElementById(`add-city-button-${id}`);
                            addCity.addEventListener('click',()=>{
                                document.getElementById('register-city').style.display = '';
                                document.getElementById('update-city').style.display = 'none';
                                document.getElementById('title-city').textContent = 'Nueva Ciudad';
                                document.getElementById('name-city').classList = 'required';
                                document.getElementById('name-city').value = '';
                            });
                            formDisplay(addCity, formCity, id, 'city');

                            const edit = document.getElementById(`edit-country-${id}`);
                            edit.addEventListener('click', () => {
                                formDisplay(edit,document.getElementById('add-country'));
                                document.getElementById('register-country').style.display = 'none';
                                document.getElementById('update-country').style.display = 'inline-block';
                                document.getElementById('title-country').textContent = 'Actualizar Pais';
                                document.getElementById('name-country').classList = 'success';
                                document.getElementById('name-country').value = pais.nombre;
                                document.getElementById('update-country').setAttribute('id-country', id);
                            });
                
                            const deleteBtn = document.getElementById(`delete-country-${id}`);
                            deleteBtn.addEventListener('click', ()=> {
                                const confirm = window.confirm(`Esta seguro que quire eliminar el pais ${pais.nombre}`);
                                if(confirm) deleteCountry(id);
                            });
                            fetchFunctions.getData(routesRegions.cities.getByCountry(id))
                                .then((res)=>{
                                    if(!res.msg) throw new Error(res.data);
                                    res.data.forEach((ciudad) => {
                                        const {idCiudad: id} = ciudad;
                                        generateDOM(ciudad,containerCountry,models.cityInfo, 'div','container-city');

                                        const edit = document.getElementById(`edit-city-${id}`);
                                        edit.addEventListener('click', () => {
                                            formDisplay(edit,document.getElementById('add-city'));
                                            document.getElementById('register-city').style.display = 'none';
                                            document.getElementById('update-city').style.display = 'inline-block';
                                            document.getElementById('title-city').textContent = 'Actualizar Ciudad';
                                            document.getElementById('name-city').classList = 'success';
                                            document.getElementById('name-city').value = ciudad.nombre;
                                            document.getElementById('update-city').setAttribute('id-city', id);
                                        });
                            
                                        const deleteBtn = document.getElementById(`delete-city-${id}`);
                                        deleteBtn.addEventListener('click', ()=> {
                                            const confirm = window.confirm(`Esta seguro que quire eliminar el ciudad ${ciudad.nombre}`);
                                            if(confirm) deleteCity(id);
                                        });
                                    });
                                })
                                .catch((err)=>{
                                    errorAdmin(err, container);
                                });
                        });
                    })
                    .catch((err)=>{
                        errorAdmin(err, container);
                    });
            });
        })
        .catch((err)=>{
            errorAdmin(err, container); 
        });
};

const registerRegion = (data, hiddenBtn) => {
    fetchFunctions.postData(routesRegions.regions.post, data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message,'error-info-region','text-error-region');
        });
};

const registerCountry = (idRegion, data, hiddenBtn) => {
    fetchFunctions.postData(routesRegions.countries.post(idRegion), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message,'error-info-country','text-error-country');
        });
};

const registerCity = (idCountry, data, hiddenBtn) => {
    fetchFunctions.postData(routesRegions.cities.post(idCountry), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message,'error-info-city','text-error-city');
        });
};

const updateRegion = (id, data, hiddenBtn) => {
    fetchFunctions.putData(routesRegions.regions.update(id), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message,'error-info-region','text-error-region');
        });
};

const updateCountry = (id, data, hiddenBtn) => {
    fetchFunctions.putData(routesRegions.countries.update(id), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message,'error-info-country','text-error-country');
        });
};

const updateCity = (id, data, hiddenBtn) => {
    fetchFunctions.putData(routesRegions.cities.update(id), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message,'error-info-city','text-error-city');
        });
};

const deleteRegion = (id) => {
    try{
        fetchFunctions.deleteData(routesRegions.regions.delete(id), token)
            .catch((err) => {
                throw new Error(err);
            });
        location.reload();
    }catch(err){
        console.log(err);
    }
};

const deleteCountry = (id) => {
    try{
        fetchFunctions.deleteData(routesRegions.countries.delete(id), token)
            .catch((err) => {
                throw new Error(err);
            });
        location.reload();
    }catch(err){
        console.log(err);
    }
};

const deleteCity = (id) => {
    try{
        fetchFunctions.deleteData(routesRegions.cities.delete(id), token)
            .catch((err) => {
                throw new Error(err);
            });
        location.reload();
    }catch(err){
        console.log(err);
    }
};

export {dataDisplay, registerRegion, registerCountry, registerCity, updateRegion, updateCountry, updateCity};