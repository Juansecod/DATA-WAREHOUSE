import { routesRegions } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import * as models from "../models/regions.js";
import { generateDOM, errorAdmin } from "./global.js";

const dataDisplay = (container)=>{
    fetchFunctions.getData(routesRegions.regions.get, token)
        .then((res)=>{
            if(!res.msg) throw new Error(res.data);
            res.data.forEach((region) => {
                const {idRegion: id} = region;
                const containerRegion = generateDOM(region,container,models.regionInfo, 'div','container-region');
    
                const edit = document.getElementById(`edit-region-${id}`);
                edit.addEventListener('click', ()=> {
                    console.log('edit: ' + id);
                });
    
                const deleteBtn = document.getElementById(`delete-region-${id}`);
                deleteBtn.addEventListener('click', ()=> {
                    const confirm = window.confirm(`Esta seguro que quire eliminar la region ${region.nombre}`);
                    /* if(confirm) deleteRegion([id]); */
                });
                fetchFunctions.getData(routesRegions.countries.getByRegion(id), token)
                    .then((res)=>{
                        if(!res.msg) throw new Error(res.data);
                        res.data.forEach((pais) => {
                            const {idPais: id} = pais;
                            const containerCountry = generateDOM(pais,containerRegion,models.countryInfo, 'div','container-country');

                            const edit = document.getElementById(`edit-country-${id}`);
                            edit.addEventListener('click', ()=> {
                                console.log('edit Country: ' + id);
                            });
                
                            const deleteBtn = document.getElementById(`delete-country-${id}`);
                            deleteBtn.addEventListener('click', ()=> {
                                const confirm = window.confirm(`Esta seguro que quire eliminar el pais ${pais.nombre}`);
                                /* if(confirm) deleteRegion([id]); */
                            });
                            fetchFunctions.getData(routesRegions.cities.getByCountry(id), token)
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
                                            /* if(confirm) deleteRegion([id]); */
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

export {dataDisplay};