const nav = document.getElementsByClassName('replace-navbars');
const token = localStorage.getItem('token');
const admin = localStorage.getItem('admin');
const view = window.location.pathname.split('/')[2];

/* Generador template lista nav */
const listGen = ()=>{
  let list = '';
  list = token ? `${list}<a href="./contactos.html"><li class="menu--contacts ${view == 'contactos.html' ? 'active' : ''}">Contactos</li></a>` : list;
  list = token && admin === "true" ? `${list}<a href="./usuarios.html"><li class="menu--users ${view == 'usuarios.html' ? 'active' : ''}">Usuarios</li></a>` : list;
  list = token ? `${list}<a href="./compañias.html"><li class="menu--companies ${view == 'compa%C3%B1ias.html' ? 'active' : ''}">Compañias</li></a>` : list;
  list = token && admin === "true" ? `${list}<a href="./regiones.html"><li class="menu--regions ${view == 'regiones.html' ? 'active' : ''}">Región/Ciudad</li></a>` : list;
  return list;
};

/* Diseño de la navbar default, analizando los requrimientos del usuario */
const navbar = `<h2 class="logo">Logo</h2>
<ul class="menu">
  ${listGen(token)}
</ul>`;

nav[0].outerHTML= navbar;