const eventLogout = (btn)=> btn.addEventListener("click", () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    window.location.replace('./index.html');
});

export default eventLogout;