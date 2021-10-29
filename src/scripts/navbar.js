const nav = document.getElementsByClassName('replace-navbars');
const token = localStorage.getItem('token');
const admin = localStorage.getItem('admin');

/* Diseño de la navbar default, analizando los requrimientos del usuario */
const navbar = `<h2 class="logo">Logo</h2>
<ul class="menu">
  ${token ? '<a href="index.html"><li class="menu--contacts">Contactos</li></a>' : ""}
  ${token && admin === "true" ? '<li class="menu--users"><a href="">Usuarios</a></li>' : ""}
  ${token ? '<li class="menu--companies"><a href="">Compañias</a></li>' : ""}
  ${token && admin === "true" ? '<li class="menu--regions"><a href="">Región/Ciudad</a></li>' : ""}
</ul>`;

nav[0].outerHTML= navbar;