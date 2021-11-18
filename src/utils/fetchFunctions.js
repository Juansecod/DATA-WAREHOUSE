/*
*   Una vez devuelta la respuesta manipular los datos como si fuera una promesa con .then:
*           respuesta.then(datos => console.log(datos))
*/

const requestInit = (method, auth, data)=>{
    let requestInit = {
        method,
        mode: 'cors',
        headers: {
            'authorization': auth,
            'Content-Type':  (!data && data != {}) ? '' : 'application/json'
        }
    };
    if(data != undefined && data != {}) {
        requestInit.body = JSON.stringify(data);
    }
    return requestInit;
};

const getData = async (url, auth = '') => {
    const response = await(fetch(url,requestInit('GET',auth)));
    return response.json();
};

const postData = async (url, data = {}, auth = '') => {
    const response = await fetch(url, requestInit('POST', auth, data));
    return response.json();
};

const putData = async (url, data = {}, auth = '') => {
    const response = await fetch(url, requestInit('PUT', auth, data));
    return response.json();
};

const deleteData = async (url, auth = '') => {
    const response = await fetch(url, requestInit('DELETE',auth));
};

export { getData, postData, putData, deleteData };

/* postData('http://192.168.1.11:3001/api/v1/users/signIn', {email: "juanseAdmin@mail.com", contrasena: "juanse2806"}).then(res => console.table(res)); */
/* const listRegions = getData('http://192.168.1.11:3001/api/v1/regions/list');
listRegions.then((res)=>console.table(res)); */