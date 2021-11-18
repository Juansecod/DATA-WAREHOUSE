const tableCompanies = ({idCompania: id,nombre,email,ciudad,direccion,telefono})=> {
    return `
        <td class="name">
            <p>${nombre}</p>
        </td>
        <td class="email">
            <a href="mailto:${email}" style="color: black;">${email}</a>
        </td>
        <td class="phone">
            <p>${(telefono!= null) ? telefono : 'No disponible'}</p>
        </td>
        <td class="address">
            <p>${direccion}</p>
        </td>
        <td class="city">
            <p>${ciudad}</p>
        </td>
        <td class="actions">
            <button class="edit" id="edit-${id}"><i class="fas fa-edit"></i></button>
            <button class="delete" id="delete-${id}"><i class="fas fa-trash-alt"></i></button>
        </td>
    `;
};

export default tableCompanies;