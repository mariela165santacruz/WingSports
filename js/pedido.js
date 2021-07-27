const carro= new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');

cargarEvento();

function cargarEvento(){
    productos.addEventListener('click', (e)=>{comprarProductos(e)});
}