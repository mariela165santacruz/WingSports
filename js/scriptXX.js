const miTienda = [
    {
        id: 0,
        titulo : 'Lentes de sol',
        precio : 15500,
        img : 'https://www.opticapaesani.com.ar/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/p/a/parkif_c1_perfil.jpg',
    },
    {
        id: 1,
        titulo : 'Lentes de sol',
        precio : 3500,
        img : 'https://www.opticapaesani.com.ar/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/p/a/parkif_c1_perfil.jpg',
    },
    {
        id: 2,
        titulo : 'Lentes de sol',
        precio : 2500,
        img : 'https://www.opticapaesani.com.ar/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/p/a/parkif_c1_perfil.jpg',
    },
    {
        id: 3,
        titulo : 'Lentes de sol',
        precio : 5500,
        img : 'https://www.opticapaesani.com.ar/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/p/a/parkif_c1_perfil.jpg',
    },
    {
        id: 4,
        titulo : 'Lentes de sol',
        precio : 2500,
        img : 'https://www.opticapaesani.com.ar/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/p/a/parkif_c1_perfil.jpg',
    },
    {
        id: 5,
        titulo : 'Lentes de sol',
        precio : 5500,
        img : 'https://www.opticapaesani.com.ar/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/p/a/parkif_c1_perfil.jpg',
    }

];

console.log(miTienda);

const container = document.getElementById('container');
for(const producto of miTienda){
  $('#container').append(`<div class="card" style="width: 15rem; text-align: center; margin: auto;"><div class="card-body">
        <h5 class="card-title">${producto.titulo} </h5>
        <h6 class="card-subtitle mb-2 text-muted">$${producto.precio}</h6>
        <button id= $ "${producto.id}" type="button" class="btn btn-primary btnPresent">COMPRAR</button>
      </div>
    </div>`);
    
}

const buttons = document.getElementsByClassName('btnPresent');

for( const button of buttons){
    button.addEventListener('click', (event) => {
        const buttonClickeado = event.target;
        console.log(buttonClickeado.id);
        const productosPresente = miTienda.find((productoItem) => productoItem.id === parseInt(buttonClickeado.id));

        productosPresente.presente = true;

    console.log(miTienda);
  });
}

const btnGuardar = document.getElementById('btnGuardar');

btnGuardar.addEventListener('click', () => {
  
    const miTiendaPresente = miTienda.filter((productoItem) => productoItem.presente);
    console.log(miTiendaPresente);
    // PENDIENTE PISAR PRODUCTOS YA COMPRADOS
    localStorage.setItem('miTiendaPresentes', JSON.stringify(miTiendaPresente));
  
    const containerPresentes = document.getElementById('containerPresentes');

    for (const producto of miTiendaPresente) {
       $("#app").append(`<div><h3> ID: ${producto.id}</h3>
                                <p> Producto: ${producto.titulo}</p>
                                <b> $: ${producto.precio}</b></div>`);
      }
    });

   
    $("#app").prepend(`<input type="text"   class="inputsClass">
                   <input type="number" class="inputsClass">
                   <select class="inputsClass">
                        <option value="1" selected >ID 1</option>
                        <option value="2">ID 2</option>
                        <option value="3">ID 3</option>
                    </select>`);
//Asociamos el evento change a todos los inputs
$(".inputsClass").change(function (miTienda) { 
    console.log(e.target.value);
    console.log(this.value);
});

$("#app").prepend(`<form id="myForm">
                       <input type="text"  >
                       <input type="number">
                       <input type="submit">
                   </form>`);
//Asociamos el evento submit al formulario
$("#myForm").submit(function (miTienda) {
    //Prevenimos el comportamiento de submit 
    e.preventDefault();
    //Obtenemos hijos del formulario
    let hijos = $(e.target).children();
    //Primer input type="text"
    console.log(hijos[0].value);
    //Primer input type="number"
    console.log(hijos[1].value);
});



//FORM DE CONSULTAS
function validaForm(){
    // Campos de texto
    if($("#nombre").val() == ""){
        alert("El campo Nombre no puede estar vacío.");
        $("#nombre").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#apellidos").val() == ""){
        alert("El campo Apellidos no puede estar vacío.");
        $("#apellidos").focus();
        return false;
    }
    if($("#direccion").val() == ""){
        alert("El campo Dirección no puede estar vacío.");
        $("#direccion").focus();
        return false;
    }

    // Checkbox
    if(!$("#mayor").is(":checked")){
        alert("Debe confirmar que es mayor de 18 años.");
        return false;
    }

    return true; // Si todo está correcto
}
$(document).ready( function() {   // Esta parte del código se ejecutará automáticamente cuando la página esté lista.
    $("#botonenviar").click( function() {     // Con esto establecemos la acción por defecto de nuestro botón de enviar.
        if(validaForm()){                               // Primero validará el formulario.
            $.post("enviar.php",$("#formdata").serialize(),function(res){
                $("#formulario").fadeOut("slow");   // Hacemos desaparecer el div "formulario" con un efecto fadeOut lento.
                if(res == 1){
                    $("#exito").delay(500).fadeIn("slow");      // Si hemos tenido éxito, hacemos aparecer el div "exito" con un efecto fadeIn lento tras un delay de 0,5 segundos.
                } else {
                    $("#fracaso").delay(500).fadeIn("slow");    // Si no, lo mismo, pero haremos aparecer el div "fracaso"
                }
            });
        }
    });    
});