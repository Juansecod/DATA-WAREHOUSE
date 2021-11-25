import { routesCompanies } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import tableCompanies from "../models/companies.js";
import { errorAdmin, errorForm, generateDOM } from "./global.js";
import SessionStorage from "../scripts/app.js";
import { addCompanyDisplay } from "../events/companies.js";

const dataTable = (table)=>{
    fetchFunctions.getData(routesCompanies.get, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            res.data.forEach(compania => {
                const {idCompania: id} = compania;
                generateDOM(compania,table,tableCompanies,'tr');

                const edit = document.getElementById(`edit-${id}`);
                edit.addEventListener('click', ()=> {
                    addCompanyDisplay(edit,document.getElementById('add-company'));
                    document.getElementById('register-company').style.display = 'none';
                    document.getElementById('update-company').style.display = 'inline-block';
                    document.getElementById('title').textContent = 'Actualizar Compañia';
                    document.getElementById('name').value = compania.nombre;
                    document.getElementById('name').classList = 'success';
                    document.getElementById('email').value = compania.email;
                    document.getElementById('email').classList = 'success';
                    document.getElementById('phone').value =compania.telefono;
                    const citiesDatabase = new SessionStorage().get('cities');
                    const {id: idCiudad} = citiesDatabase.find((city) => {if(city.nombre==compania.ciudad) return city;});
                    document.getElementById('city').value = idCiudad;
                    document.getElementById('city').classList = 'success';
                    document.getElementById('address').value = compania.direccion;
                    document.getElementById('update-company').setAttribute('id-company', id);
                });
                
                const deleteBtn = document.getElementById(`delete-${id}`);
                deleteBtn.addEventListener('click', ()=> {
                    const confirm = window.confirm(`Esta seguro que quire eliminar la compañia ${compania.nombre}`);
                    if(confirm) deleteCompany([id]);
                });
            });
        })
        .catch(err => {
            errorAdmin(err,table);
        });
};

const registerCompany = (data, hiddenBtn)=>{
    fetchFunctions.postData(routesCompanies.register, data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message);
        });
};

const updateCompany = (data, id,hiddenBtn)=>{
    fetchFunctions.putData(routesCompanies.update(id), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            console.log(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(err => {
            console.log(err);
            errorForm(err.message);
        });
};

const deleteCompany = async (array) => {
    try{
        await array.forEach((id) => {
            fetchFunctions.deleteData(routesCompanies.delete(id), token)
                .catch((err) => {
                    throw new Error(err);
                });
        }); 
        location.reload();
    }catch(err){
        console.log(err);
    }
};

export { dataTable, registerCompany, updateCompany, deleteCompany };