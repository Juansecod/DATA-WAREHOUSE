import { routesRegions } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import * as models from "../models/regions.js";
import { generateDOM, errorAdmin } from "./global.js";
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
                formDisplay(addCountry, formCountry, id, 'country');

                const edit = document.getElementById(`edit-region-${id}`);
                edit.addEventListener('click', ()=> {
                    console.log('edit: ' + id);
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
                            formDisplay(addCity, formCity, id, 'city');

                            const edit = document.getElementById(`edit-country-${id}`);
                            edit.addEventListener('click', ()=> {
                                console.log('edit Country: ' + id);
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
                                        edit.addEventListener('click', ()=> {
                                            console.log('edit City: ' + id);
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
            errorForm(message);
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
            errorForm(message);
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
            errorForm(message);
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

export {dataDisplay, registerRegion, registerCountry, registerCity};