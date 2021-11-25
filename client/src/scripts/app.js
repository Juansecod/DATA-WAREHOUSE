import eventLogout from "../events/logout.js";
import {getData} from "../utils/fetchFunctions.js";
import { sortArray } from "../utils/global.js";
import { routesRegions } from "../utils/routes.js";

const view = (window.location.pathname.split('/')[2] == 'pages') ? window.location.pathname.split('/')[3] : window.location.pathname.split('/')[2];
const btnLogout = document.getElementById('logout');
class SessionStorage {
    constructor(obj, type) {
        this[type] = obj;
    }
    get(type){
        let data = JSON.parse(sessionStorage.getItem(type));
        return data;
    }
    set(type){
        let data = JSON.parse(sessionStorage.getItem(type)) || [];
        const exist = data.find(({id}) => id===this[type].id);
        if(!exist) data.push(this[type]);
        sortArray(data);
        sessionStorage.setItem(type,JSON.stringify(data));
    }
}

async function regions(){
    await getData(routesRegions.regions.get)
        .then((res)=>{
            if(!res.msg) throw new Error(res.data);
            res.data.forEach(async({idRegion: id,nombre}) => {
                const region = await new SessionStorage({id,nombre},'regions');
                region.set('regions');
            });
        })
        .catch((err)=> {
            console.error(err);
        });
}

async function countries(){
    await getData(routesRegions.countries.get)
        .then((res)=>{
            if(!res.msg) throw new Error(res.data);
            res.data.forEach(({idPais: id,nombre, idRegion}) => {
                const country = new SessionStorage({id, nombre, idRegion},'countries');
                country.set('countries');
            });
        })
        .catch((err)=> {
            console.error(err);
        });
}

async function cities(){
    await getData(routesRegions.cities.get)
        .then((res)=>{
            if(!res.msg) throw new Error(res.data);
            res.data.forEach(({idCiudad: id,nombre, idPais}) => {
                const country = new SessionStorage({id, nombre, idPais},'cities');
                country.set('cities');
            });
        })
        .catch((err)=> {
            console.error(err);
        });
}

regions();
countries();
cities();

// Condicional de loggeo 
if(token == undefined && view != 'index.html' ) window.location.replace("./index.html");

if(btnLogout) eventLogout(btnLogout);

export default SessionStorage;