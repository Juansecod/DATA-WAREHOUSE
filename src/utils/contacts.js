import { routesContacts } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import tableContacts from "../models/contacts.js";
import { errorForm, generateDOM } from "./global.js";

const dataTable = (table, btnLogout)=>{
    fetchFunctions.getData(routesContacts.get, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            let hash = {};
            const contacts = res.data.filter(o => hash[o.idContacto] ? false : hash[o.idContacto] = true);
            if(contacts.length <= 0) throw new Error('Not content');
            contacts.forEach(contacto => {
                const {idContacto: id} = contacto;
                generateDOM(contacto, table, tableContacts,'tr');

                const edit = document.getElementById(`edit-${id}`);
                edit.addEventListener('click', ()=> {
                    console.log('edit: ' + id);
                });

                const deleteBtn = document.getElementById(`delete-${id}`);
                deleteBtn.addEventListener('click', ()=> {
                    const confirm = window.confirm(`Esta seguro que quire eliminar el usuario con correo ${contacto.nombre} ${contacto.apellido}`);
                    if(confirm) deleteContact([id]);
                });
            });
        })
        .catch(err => {
            if(err.message.toLowerCase() == "no tienes acceso") btnLogout.click();
            table.style.display = 'none'; 
        });
};

const registerContact = (data, hiddenBtn) => {
    fetchFunctions.postData(routesContacts.register,data,token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message);
        });
};

const updateUser = (data, id,hiddenBtn)=>{
    fetchFunctions.putData(routesUsers.updateUser(id), data, token)
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

const deleteContact = async (array) => {
    try{
        await array.forEach((id) => {
            fetchFunctions.deleteData(routesContacts.delete(id), token)
                .catch((err) => {
                    throw new Error(err);
                });
        });
        location.reload();
    }catch(err){
        console.log(err);
    }
};

export {dataTable, registerContact, deleteContact};