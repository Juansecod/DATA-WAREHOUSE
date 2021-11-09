const port = 3001;
const basePath = `localhost:${port}/api/v1`;

const routesUsers = {
    login: `${basePath}/users/signIn`,
    signUp: `${basePath}/users/signUpUser`,
    get: `${basePath}/users/`,
    userById: (id) => `${basePath}/users/${id}`,
    update: (id) => `${basePath}/users/update/${id}`,
    updateRol: (idUser, idRol) => `${basePath}/users/updateRol/${idUser}?idRol=${idRol}`,
    delete: (id) => `${basePath}/users/delete?idUser=${id}`
};

const routesContacts = {
    get: `${basePath}/contacts`,
    register: `${basePath}/contacts/register`,
    addNetworks: (id) => `${basePath}/contacts/addNetworks/${id}`,
    update: (id) => `${basePath}/contacts/update/${id}`,
    delete: (id) => `${basePath}/contacts/delete?id=${id}`
};

const routesCompanies = {
    get: `${basePath}/companies/`,
    register: `${basePath}/companies/register`,
    upadte: (id) => `${basePath}/companies/update/${id}`,
    delete: (id) => `${basePath}/companies/delete?id=${id}`
};

const routesRegions = {
    all: `${basePath}/regions/list`,
    regions: {
        get: `${basePath}/regions`,
        post: `${basePath}/regions/register`,
        update:  (id) => `${basePath}/regions/update/${id}`,
        delete: (id) => `${basePath}/regions/delete?idRegion=${id}`
    },
    countries: {
        get: `${basePath}/regions/countries`,
        getByRegion: (idRegion) => `${basePath}/regions/${idRegion}/countries`,
        post: (idRegion) => `${basePath}/regions/${idRegion}/countries/register`,
        update: (id) => `${basePath}/regions/countries/${id}`,
        delete: () => `${basePath}/regions/countries/delete?idCountry=${id}`,
    },    
    cities:{
        get: `${basePath}/regions/cities`,
        getByCountry: (idCountry) => `${basePath}/regions/countries/${idCountry}/cities`,
        post:  (idCountry) =>`${basePath}/regions/countries/${idCountry}/cities/register`,
        update: (id) => `${basePath}/regions/cities/update/${id}`,
        delete: (id) => `${basePath}/regions/cities/delete?idCity=${id}`
    }
};

export default {routesUsers, routesContacts, routesCompanies, routesRegions};