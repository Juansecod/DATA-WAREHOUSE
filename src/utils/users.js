import { routesUsers } from "../utils/routes.js";
import * as fetchFunctions from '../utils/fetchFunctions.js';
import tableUsers from "../models/users.js";
import { eventDeleteBtn } from "../events/users.js";
import { errorAdmin, errorForm, generateDOM } from "./global.js";

const dataTable = (table)=>{
    fetchFunctions.getData(routesUsers.get, token)
        .then(res => {
            if(!res.msg) throw new Error(res.data);
            res.data.forEach(usuario => {
                const {idUsuario: id} = usuario;
                generateDOM(usuario,table,tableUsers, 'tr');
                
                const edit = document.getElementById(`edit-${id}`);
                edit.addEventListener('click', ()=> {
                    console.log('edit: ' + id);
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
    fetchFunctions.putData(routesUsers.updateUser(id), data, token)
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