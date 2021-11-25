const cityInfo = ({idCiudad: id, nombre})=> {
    return `
        <div class="info-city">
            <p>${nombre}</p>
            <div>
                <button class="edit" id="edit-city-${id}"><i class="fas fa-edit"></i></button>
                <button class="delete" id="delete-city-${id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    `;
};

const countryInfo = ({idPais: id, nombre})=> {
    return `
    <div class="container-header">
        <div class="info-country">
            <h4>${nombre}</h4>
            <div>
                <button class="edit" id="edit-country-${id}"><i class="fas fa-edit"></i></button>
                <button class="delete" id="delete-country-${id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        <div class="button-add-city">
            <a id="add-city-button-${id}"><button>Agregar Ciudad</button></a>
        </div>
    </div>
    `;
};

const regionInfo = ({idRegion: id, nombre})=> {
    return `
    <div class="container-header">
        <div class="info-region">
            <h3>${nombre}</h3>
            <div>
                <button class="edit" id="edit-region-${id}"><i class="fas fa-edit"></i></button>
                <button class="delete" id="delete-region-${id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        <div class="button-add-country">
            <a id="add-country-button-${id}"><button>Agregar País</button></a>
        </div>
    </div>
    `;
};

export {cityInfo, countryInfo, regionInfo};