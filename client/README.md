# Frontend
## 🥳 Empezando
Solo sigue estos sencillos pasos para el correcto funcionamiento de nuestro cliente

### 🤔 Prerequisitos

Para poder utilizar este proyecto sin nungun problema necesitamos contar con las siguientes herramientas:
* [Visual Studio Code](https://code.visualstudio.com/download) (Descargar la version mas reciente)
* Extension para el VS Code ejecutar nuestro cliente en tiempo real [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
* El navegador web de su preferencia. En este caso fue desarrollado en [Google Chrome](https://www.google.com/intl/es/chrome/), por lo que estara mejor optimizado en dicho navegador
* Solo esta disponible para la vista de escritorio, minimo se require una pantalla de 1366px para su correcta visualizacion

### 🤯 Instalacion

1. Clona el repositorio en tu maquina, para esto abrimos git bash y pegamos el siguiente comando(Tambien es valido descargar el archivo .zip y extraerlo)
   ```sh
   git clone https://github.com/Juansecod/DATA-WAREHOUSE.git
   ```
2. Nos paramos sobre la carpeta del proyecto
3. Por ultimo nos paramos sobre la carpeta de nuestro cliente.

### 🤓 Inicializacion

1. Ya con todo listo para ejecutamos el VS Code
2. Ya en nuestro VS Code, buscamos el live server y revisamos que el puerto este configurado en uno diferente al de nuestra API. Lo que tienes que hacer es abrir un documento html, le das a click derecho en el código y finalmente le das click a «Open With Live Server»
3. Y listo, verifica primero de tener montada nuestra API para el correcto funcionamiento del cliente. [Aqui](https://github.com/Juansecod/DATA-WAREHOUSE/tree/main/backend#readme) te dejo la documentacion para montarla.

# Importante!
 Validar dentro de la ruta ``\src\utils\`` el archivo ``routes.js``, dentro de el encontrara la variable llamada ``port``, en ella ingrese el puerto en el que tiene montada la API para el correcto funcionamiento de peticiones