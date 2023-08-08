
// Declaración de variables
let urlName = 'https://digimon-api.vercel.app/api/digimon/name/';
var nombreDiv = document.getElementById('nombre');
var imagenDiv = document.getElementById('imagen');
var nivelDiv = document.getElementById('nivel');
var buscador = document.getElementById('buscador');
var barraBusqueda = document.getElementById('digimon');
var boton = document.getElementById('buscar');
var lista = document.getElementById('lista');

// Definir arreglo de digimones en vacío
digimones = [];

// Fetch para hacer la lista
async function listaDigimon() {
  const response = await fetch('https://digimon-api.vercel.app/api/digimon');
  const digimones = await response.json();

  let id = 0;
  let tablaDigimon = '';

  // Iteración del array para hacer cada fila de la lista
  digimones.forEach((digimon, index) => {
    id += 1;
    tablaDigimon += `
      <tr>
        <td>${id}</td>
        <td><a href="#">${digimon.name}</a></td>
        <td>${digimon.level}</td>
      </tr>
    `;
  });

  document.getElementById('lista').innerHTML = tablaDigimon;
}

listaDigimon();

// Función para mostrar el digimon desde la lista
lista.addEventListener('click', async function(event) {
  event.preventDefault();
  const digimon = event.target.closest('tr');
  if (digimon) {
    const nombre = digimon.querySelector('a').textContent;
    barraBusqueda.value = nombre;
    validarFormulario(event);
    barraBusqueda.value = '';  //borra el contenido del input
  }
});

// Función para buscar por nombre en el formulario
function validarFormulario(event) {
  event.preventDefault();

  fetch(urlName + barraBusqueda.value)
    .then(resp => resp.json())
    .then(data => {
      data = data[0];
      nombreDiv.innerHTML = `<h1>Nombre del digimon:</h1> <h3>${data.name}</h3>`;
      nivelDiv.innerHTML = `<h1>Nivel:</h1> <h3>${data.level}</h3>`;
      imagenDiv.src = data.img;
      barraBusqueda.value = '';  //borra el contenido del input
      
      //vuelve la página arriba después de activar la funcion
      document.getElementById('nombre').scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
    .catch(error => {
      console.error(error);
    });
}

// Agregar un evento de escucha al formulario
buscador.addEventListener('submit', validarFormulario);
