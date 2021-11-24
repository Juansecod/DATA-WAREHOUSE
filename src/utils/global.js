function generateDOM(object, father, model, typeContainer = 'div', classList = '' ){
	const childrenParent = document.createElement(typeContainer);
	childrenParent.classList = classList;
	childrenParent.innerHTML = model(object);
	father.appendChild(childrenParent);

    return childrenParent;
}

function errorAdmin (errorInfo, container) {
    if(errorInfo.message.toLowerCase() == "no tienes acceso") window.location.replace('./contactos.html');
    container.style.display = 'none'; 
}

function errorForm (message = 'Ups, algo ha salido mal', idError = 'error-info', idTextError = 'text-error'){
    const container = document.getElementById(idError);
    const text = document.getElementById(idTextError);
    container.style.display = 'flex';
    text.textContent = message;
    setTimeout(function(){ 
        container.style.display = 'none';
    },5000);
}

function sortArray(array){
    array.sort(function (a, b) {
        if (a.nombre > b.nombre) {
        return 1;
        }
        if (a.nombre < b.nombre) {
        return -1;
        }
        return 0;
    });
}

const insertOptionsSelect = (data,select)=>{
    const option =  document.createElement('option');
    option.textContent = data.nombre;
    option.value = data.id;
    select.appendChild(option);
};

export {generateDOM,errorAdmin, errorForm, sortArray, insertOptionsSelect};