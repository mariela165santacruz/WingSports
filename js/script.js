window.onload = function () {
  // Variables
  const baseDeDatos = [
      {
          id: 1,
          nombre: 'Jordan 1 Mid Shoe - Amarillo',
          precio: 17999,
          imagen: 'img/productos/Air Jordan 1 Mid Shoe-amarillo.jpg'
      },
      {
          id: 2,
          nombre: 'Jordan 1 Mid Shoe - Azul y Blanco',
          precio: 17999,
          imagen: 'img/productos/Air Jordan 1 Mid Shoe-azul y blanco.jpg'
      },
      {
          id: 3,
          nombre: 'Jordan 1 Mid Shoe - Azul',
          precio: 17999,
          imagen: 'img/productos/Air Jordan 1 Mid Shoe-azul.jpg'
      },
      {
          id: 4,
          nombre: 'Jordan 1 Mid Shoe - Celeste',
          precio: 17999,
          imagen: 'img/productos/Air Jordan 1 Mid Shoe-celeste.jpg'
      },
      {
        id: 5,
        nombre: 'Jordan 1 Mid Shoe - Multicolor',
        precio: 17999,
        imagen: 'img/productos/Air Jordan 1 Mid Shoe-Multicolor.jpg'
    },
    {
        id: 6,
        nombre: 'Jordan 1 Mid Shoe - Salmon',
        precio: 21000,
        imagen: 'img/productos/Air Jordan 1 Mid Shoe-salmon.jpg'
    },
    {
        id: 7,
        nombre: 'Jordan 1 Mid Shoe - Rojo',
        precio: 21000,
        imagen: 'img/productos/Air Jordan 1 Mid Shoe-rojo.jpg'
    },
    {
        id: 8,
        nombre: 'Jordan 1 Mid Shoe - Turquesa',
        precio: 23000,
        imagen: 'img/productos/Air Jordan 1 Mid Shoe-turquesa.jpg'
    },
    {
      id: 9,
      nombre: 'Jordan 1 Mid Shoe - Rojo y negro',
      precio: 23000,
      imagen: 'img/productos/Air Jordan 1 Mid Shoe-rojo y negro.jpg'
  }
  ];

  let carrito = [];
  let total = 0;
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  const miLocalStorage = window.localStorage;

  // Funciones

 //Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
  function renderizarProductos() {
      baseDeDatos.forEach((info) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('card', 'col-sm-4');
          // Body
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
          // Titulo
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          // Imagen
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
          miNodoImagen.setAttribute('src', info.imagen);
          // Precio
          const miNodoPrecio = document.createElement('p');
          miNodoPrecio.classList.add('card-text');
          miNodoPrecio.textContent =  '$'+ info.precio;
          // Boton 
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = 'Comprar';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          // Insertamos
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoPrecio);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);
      });
  }

  
  //Evento para añadir un producto al carrito de la compra
  function anyadirProductoAlCarrito(evento) {
      carrito.push(evento.target.getAttribute('marcador'))

      calcularTotal(); 
      renderizarCarrito();
      guardarCarritoEnLocalStorage();
  }

 // Dibuja todos los productos guardados en el carrito
  function renderizarCarrito() {
      DOMcarrito.textContent = '';
      const carritoSinDuplicados = [...new Set(carrito)];

      carritoSinDuplicados.forEach((item) => {
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
              return itemId === item ? total += 1 : total;
          }, 0);
          
          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
          const miBoton = document.createElement('button');
          miBoton.classList.add('btn', 'btn-danger', 'mx-5');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '1rem';
          miBoton.dataset.item = item;

          miBoton.addEventListener('click', borrarItemCarrito);
          miNodo.appendChild(miBoton);
          DOMcarrito.appendChild(miNodo);
      });
  }

  
  //Evento para borrar un elemento del carrito
  function borrarItemCarrito(evento) {
      const id = evento.target.dataset.item;
      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;
      });

      renderizarCarrito();
      calcularTotal();
      guardarCarritoEnLocalStorage();

  }

  
  //Calcula el precio total teniendo en cuenta los productos repetidos
  function calcularTotal() {
      total = 0;
      carrito.forEach((item) => {
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          total = total + miItem[0].precio;
      });
      
      DOMtotal.textContent = total.toFixed(2);
  }

  
  function vaciarCarrito() {
      // Limpiamos los productos guardados
      carrito = [];
      renderizarCarrito();
      calcularTotal();
      // Borra LocalStorage
      localStorage.clear();

  }

  function guardarCarritoEnLocalStorage () {
      miLocalStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage () {
      if (miLocalStorage.getItem('carrito') !== null) {
          // Carga la información
          carrito = JSON.parse(miLocalStorage.getItem('carrito'));
      }
  }

  // Eventos
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);

  // Inicio
  cargarCarritoDeLocalStorage();
  renderizarProductos();
  calcularTotal();
  renderizarCarrito();
}

//FORM DE CONSULTAS
function validaForm(){
    // Campos de texto
    if($("#nombre").val() == ""){
        swal("El campo Nombre no puede estar vacío.");
        $("#nombre").focus();      
        return false;
    }
    if($("#direccion").val() == ""){
        swal("El campo Dirección no puede estar vacío.");
        $("#direccion").focus();
        return false;
    }
    if($("#consulta").val() == ""){
        swal("El campo Consulta no puede estar vacío.");
        $("#consulta").focus();
        return false;
    }
   

    // Checkbox
    if(!$("#mayor").is(":checked")){
        swal("Debe confirmar que es mayor de 18 años.");
        return false;
    }

    return true; 
}
$(document).ready( function() {   
    $("#botonenviar").click( function() {     
        if(validaForm()){                           
            $.post("enviar.php",$("#formdata").serialize(),function(res){
                $("#formulario").fadeOut("slow");   
                if(res == 1){
                    $("#exito").delay(500).fadeIn("slow");      
                } else {
                    $("#fracaso").delay(500).fadeIn("slow");    
                }
            });
        }
    });    
});

//Animaciones
// Fix Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll 
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
  if (!link) return;
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);

    const element = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});

gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10 });
gsap.from(".hamburger", { opacity: 0, duration: 1, delay: 1, x: 20 });
gsap.from(".hero-img", { opacity: 0, duration: 1, delay: 1.5, x: -200 });
gsap.from(".hero-content h2", { opacity: 0, duration: 1, delay: 2, y: -50 });
gsap.from(".hero-content h1", { opacity: 0, duration: 1, delay: 2.5, y: -45 });
gsap.from(".hero-content a", { opacity: 0, duration: 1, delay: 3.5, y: 50 });

