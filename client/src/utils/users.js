import { routesUsers } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import tableUsers from "../models/users.js";
import { eventDeleteBtn, addUserDisplay } from "../events/users.js";
import { errorAdmin, errorForm, generateDOM } from "./global.js";

const dataTable = (table)=>{
    fetchFunctions.getData(routesUsers.get, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            res.data.forEach(usuario => {
                const {idUsuario: id} = usuario;
                generateDOM(usuario,table,tableUsers, 'tr');
                
                const edit = document.getElementById(`edit-${id}`);
                edit.addEventListener('click',()=>{
                    addUserDisplay(edit,document.getElementById('add-user'));
                    document.getElementById('register-user').style.display = 'none';
                    document.getElementById('note').style.display = 'none';
                    document.getElementById('container-rols').style.display = 'none';
                    document.getElementById('update-user').style.display = 'inline-block';
                    document.getElementById('title').textContent = 'Actualizar Usuario';
                    document.getElementById('name').value = usuario.nombre;
                    document.getElementById('last-name').value = usuario.apellido;
                    document.getElementById('email').value = usuario.email;
                    document.getElementById('email').classList = 'success';
                    document.getElementById('update-user').setAttribute('id-user', id);
                });

                const deleteBtn = document.getElementById(`delete-${id}`);
                deleteBtn.addEventListener('click', () => { eventDeleteBtn(usuario, id); });
            });
        })
        .catch(err => {
            errorAdmin(err,table);
        });
};

const registerUser = (data, hiddenBtn)=>{
    fetchFunctions.postData(routesUsers.signUp, data, token)
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
    fetchFunctions.putData(routesUsers.update(id), data, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            console.log(res.data);
            hiddenBtn.click();
            location.reload();
        })
        .catch(({message}) => {
            errorForm(message);
        });
};

const deleteUser = async (array) => {
    try{
        await array.forEach((id) => {
            fetchFunctions.deleteData(routesUsers.delete(id), token)
                .catch((err) => {
                    throw new Error(err);
                });
        }); 
        location.reload();
    }catch(err){
        console.log(err);
    }
};

export { dataTable, registerUser, updateUser, deleteUser };