const tableContacts = ({idContacto: id,nombre,apellido, cargo, email, interes, compania, ciudad, direccion})=> {
    return `
    <td class="table-select"><input type="checkbox" name="select-contact" id="select-${id}" class="select-checkbox" value=${id}></td>
    <td class="info-contact">
        <img src="../assets/profile-picture.png" alt="picture-contact">
        <div class="text">
            <h4>${nombre} ${apellido}</h4>
            <a href="mailto:${email}">${email}</a>
        </div>
    </td>
    <td class="region">
        <h4>${ciudad}</h4>
        <p>${direccion}</p>
    </td>
    <td class="company">
        <h4>${compania}</h4>
    </td>
    <td class="job">
        <h4>${cargo}</h4>
    </td>
    <td class="interest">
        <h4>${interes}%</h4>
        <div class="background-bar">
            <div class="percentage-bar percentage-bar--${interes}"></div>
        </div>
    </td>
    <td class="actions">
        <button class="edit" id="edit-${id}"><i class="fas fa-edit"></i></button>
        <button class="delete" id="delete-${id}"><i class="fas fa-trash-alt"></i></button>
    </td>`;
};

const formNetwork = (id) => {
    return`
        <div class="container-input">
            <label for="channel">Canal Contacto</label>
            <select name="channel" id="channel-${id}">
                <option disabled selected hidden value="">Seleccione un canal</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">Linkedin</option>
                <option value="whatsapp">Whatsapp</option>
            </select>
        </div>
        <div class="container-input">
            <label for="nick-channel-contact">Cuenta de Usuario</label>
            <input type="text" name="nick-channel-contact" id="nick-channel-contact-${id}" placeholder="@exmaple" class="disabled" disabled>
        </div>
        <div class="container-input">
            <label for="preferences">Preferencias</label>
            <select class="disabled" name="preferences" id="preferences-${id}" disabled>
                <option selected value="Sin preferencia">Sin preferencia</option>
                <option value="canal favorito">Canal Favorito</option>
                <option value="no molestar">No molestar</option>
            </select>
        </div>
    `;
};

export {tableContacts, formNetwork};