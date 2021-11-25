import { routesContacts } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import {tableContacts} from "../models/contacts.js";
import { errorForm, generateDOM } from "./global.js";
import { addContactDisplay } from "../events/contacts.js";

function resultSearch(inputValue, data) {
    data = data.toLowerCase();
    inputValue = inputValue.toLowerCase();
    if (data.search(inputValue) != -1) {
        return true;
    } else {
        return false;
    }
}

const dataTable = (table, btnLogout, printContSelect, input = undefined)=>{
    fetchFunctions.getData(routesContacts.get, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            let hash = {};
            const contacts = res.data.filter(o => hash[o.idContacto] ? false : hash[o.idContacto] = true);

            table.innerHTML = `<tr class="table-header">
                    <th class="table-select"><input type="checkbox" name="select-all-contacts" id="select-all-contacts" class="select-checkbox"></th>
                    <th>Contacto</i></th>
                    <th>País/Región</i></th>
                    <th>Compañía</i></th>
                    <th>Cargo</i></th>
                    <th class="actions">Interés</i></th>
                    <th class="actions">Acciones</th>
                </tr>`;


            if(contacts.length <= 0) throw new Error('Not content');
            if(input == undefined) {
                contacts.forEach(contacto => {
                    const {idContacto: id} = contacto;
                    generateDOM(contacto, table, tableContacts,'tr');

                    const select = document.getElementById(`select-${id}`);
                    select.addEventListener('click', function (){
                        const selectAll = document.getElementById('select-all-contacts');
                        const selects = document.getElementsByName('select-contact');
                        let contSelect = 0;
                        selects.forEach((select)=>{ 
                            if(select.checked) contSelect =contSelect + 1;
                        });
                        printContSelect.textContent = `${contSelect} seleccionados`;
                        selectAll.checked = (selects.length == contSelect) ? true : false;
                        document.getElementById('container-bulk-delete').style.display = (contSelect == 0) ? 'none' : 'inline-block';
                    });

                    const edit = document.getElementById(`edit-${id}`);
                    edit.addEventListener('click', ()=> {
                        addContactDisplay(edit,document.getElementById('add-contact'));
                        document.getElementById('icon-info').style.display = 'none';
                        document.getElementById('info').style.display = 'none';
                        document.getElementById('register-contact').style.display = 'none';
                        document.getElementById('update-contact').style.display = 'inline-block';
                        document.getElementById('network-container').style.display = 'none';
                        document.getElementById('title').textContent = 'Actualizar Contacto';
                        document.getElementById('name').value = contacto.nombre;
                        document.getElementById('last-name').value = contacto.apellido;
                        document.getElementById('job').value = contacto.cargo;
                        document.getElementById('email').value = contacto.email;
                        document.getElementById('company').value = contacto.idCompania;
                        document.getElementById('ciudad').value = contacto.idCiudad;
                        document.getElementById('address').value = contacto.direccion;
                        document.getElementById('interest').value = contacto.interes;
                        document.getElementById('range-select').value = contacto.interes;
                        document.getElementById('update-contact').setAttribute('id-contact', id);
                    });

                    const deleteBtn = document.getElementById(`delete-${id}`);
                    deleteBtn.addEventListener('click', ()=> {
                        const confirm = window.confirm(`Esta seguro que quire eliminar el contacto con correo ${contacto.nombre} ${contacto.apellido}`);
                        if(confirm) deleteContact([id]);
                    });
                });
            }else{
                const contacts = res.data.filter(contact => {
                    if(resultSearch(input.value, contact.nombre) || resultSearch(input.value, contact.email) || resultSearch(input.value, contact.apellido) || resultSearch(input.value, contact.cargo) || resultSearch(input.value, contact.compania) || resultSearch(input.value, contact.ciudad) || resultSearch(input.value, contact.direccion)) return contact;
                });

                contacts.forEach(contacto => {
                    const {idContacto: id} = contacto;
                    generateDOM(contacto, table, tableContacts,'tr');

                    const select = document.getElementById(`select-${id}`);
                    select.addEventListener('click', function (){
                        const selectAll = document.getElementById('select-all-contacts');
                        const selects = document.getElementsByName('select-contact');
                        let contSelect = 0;
                        selects.forEach((select)=>{ 
                            if(select.checked) contSelect =contSelect + 1;
                        });
                        printContSelect.textContent = `${contSelect} seleccionados`;
                        selectAll.checked = (selects.length == contSelect) ? true : false;
                        document.getElementById('container-bulk-delete').style.display = (contSelect == 0) ? 'none' : 'inline-block';
                    });

                    const edit = document.getElementById(`edit-${id}`);
                    edit.addEventListener('click', ()=> {
                        addContactDisplay(edit,document.getElementById('add-contact'));
                        document.getElementById('icon-info').style.display = 'none';
                        document.getElementById('info').style.display = 'none';
                        document.getElementById('register-contact').style.display = 'none';
                        document.getElementById('update-contact').style.display = 'inline-block';
                        document.getElementById('network-container').style.display = 'none';
                        document.getElementById('title').textContent = 'Actualizar Contacto';
                        document.getElementById('name').value = contacto.nombre;
                        document.getElementById('last-name').value = contacto.apellido;
                        document.getElementById('job').value = contacto.cargo;
                        document.getElementById('email').value = contacto.email;
                        document.getElementById('company').value = contacto.idCompania;
                        document.getElementById('ciudad').value = contacto.idCiudad;
                        document.getElementById('address').value = contacto.direccion;
                        document.getElementById('interest').value = contacto.interes;
                        document.getElementById('range-select').value = contacto.interes;
                        document.getElementById('update-contact').setAttribute('id-contact', id);
                    });

                    const deleteBtn = document.getElementById(`delete-${id}`);
                    deleteBtn.addEventListener('click', ()=> {
                        const confirm = window.confirm(`Esta seguro que quire eliminar el contacto con correo ${contacto.nombre} ${contacto.apellido}`);
                        if(confirm) deleteContact([id]);
                    });
                });
            }
        })
        .catch(err => {
            if(err.message.toLowerCase() == "no tienes acceso") btnLogout.click();
            table.style.display = 'none'; 
        });
};

const registerContact = (data, hiddenBtn) => {
    fetchFunctions.postData(routesContacts.register, data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message);
        });
};

const updateContact = (data, id,hiddenBtn)=>{
    fetchFunctions.putData(routesContacts.update(id), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(err => {
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

export {dataTable, registerContact, updateContact, deleteContact};