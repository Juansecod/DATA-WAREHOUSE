const tableUsers = ({idUsuario: id,nombre,apellido,email,rol})=> {
    return `
    <td class="name">
        <p>${nombre}</p>
    </td>
    <td class="last-name">
        <p>${apellido}</p>
    </td>
    <td class="email">
        <a href="mailto:${email}" style="color: black;"><p>${email}</p></a>
    </td>
    <td class="rol">
        <p>${rol}</p>
    </td>
    <td class="actions">
        <button class="edit" id="edit-${id}"><i class="fas fa-edit"></i></button>
        <button class="delete" id="delete-${id}"><i class="fas fa-trash-alt"></i></button>
    </td>`;
};

export default tableUsers;