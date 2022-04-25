

const productos = [];

productos.push(new Producto("Tortas Personalizadas", "Torta Cars", 1900, "./imagenes/galeria2.jpg"));
productos.push(new Producto("Tortas Personalizadas", "Torta Instituto", 1800, "./imagenes/galeria1.jpg"));
productos.push(new Producto("Tortas Personalizadas", "Torta Fernet", 2100, "./imagenes/tortapersonalizada1.jpg"));
productos.push(new Producto("Tortas Personalizadas", "Torta Letra", 1700, "./imagenes/galeria9.jpg"));
productos.push(new Producto("Tortas Personalizadas", "Torta Among Us", 2000, "./imagenes/galeria5.jpg"));
productos.push(new Producto("Tortas y Tartas", "Pavlova", 2000,"./imagenes/pavlova.jpg"));
productos.push(new Producto("Boxes", "Box Cumpleaños", 2500,"./imagenes/boxcumpleanios.jpg"));
productos.push(new Producto("Boxes", "Box Dripcake", 2700,"./imagenes/boxdripcake.jpg"));
productos.push(new Producto("Boxes", "Box Minicakes", 2000,"./imagenes/boxminicakes.jpg"));
productos.push(new Producto("Boxes", "Box Navidad", 1900,"./imagenes/boxnavidad.jpg"));
productos.push(new Producto("Boxes", "Box Niño", 2000,"./imagenes/boxninio.jpg"));
productos.push(new Producto("Especialidades", "Cupcake", 150,"./imagenes/especialidad1.jpg"));
productos.push(new Producto("Especialidades", "Budín", 250,"./imagenes/especialidad2.jpg"));
productos.push(new Producto("Especialidades", "Popcake", 100, "./imagenes/especialidadpopcake.jpg"));
productos.push(new Producto("Especialidades", "Ice Popcake", 200, "./imagenes/especialidadpopcake2.jpg"));


let carrito = [];

const claveLocalStorage = "compraCarrito";

let seccionProductos = document.getElementById("productos");
let items = document.querySelectorAll("#productos div");
let botonesCompra = document.getElementsByClassName("btnCompra");
let totalCarrito = document.querySelector("#carrito div");
let botonVaciar = document.querySelector("#btnVaciar");

mostrarCarrito();

botonVaciar.addEventListener("click",vaciarCarrito); 

for (let i = 0; 0 < productos.length; i++) {
    items[i].children[0].textContent = productos[i].categoria;
    items[i].children[1].textContent = productos[i].nombre;
    items[i].children[2].textContent = `$${productos[i].precio}`;
    items[i].children[3].innerHTML = `<img src= "${productos[i].imagen}" alt="${productos[i].nombre}" width= 100px height= 100px>`;
    
    botonesCompra[i].addEventListener("click", ()=>{
        carrito.push(new Carrito(productos[i].nombre,productos[i].precio));
        localStorage.setItem(claveLocalStorage,JSON.stringify(carrito));
        let lista = document.createElement("div");
        seccionProductos.appendChild(lista);
        lista.textContent = `Se añadió un/una ${productos[i].nombre} al carrito con un precio de $${productos[i].precio}.`
        
        Swal.fire({
            html: '<h3>Producto agregado al carrito.</h3>',
            color: '#865101',
            imageAlt: 'Valeria Sword - Logo',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            allowEscapeKey: true,
            width: '400px',
            height: '50px',
          })
    });
}

function mostrarCarrito(){

    let carro = localStorage.getItem(claveLocalStorage);
    if (carro){

        carro = JSON.parse(carro);

        carrito = carro;


        for (let i = 0;i<carro.length;i++){

            let compra = carro[i];
            document.write(`${compra.prod} - $${compra.total}`);
            document.write("<br>")
            
        }

    }

}

function vaciarCarrito(){
    carrito = [];
    localStorage.setItem(claveLocalStorage,JSON.stringify(carrito));

    Swal.fire({
        title: '¿Desea vaciar el carrito?',
        text: "Deberás agregar los productos nuevamente.",
        icon: 'warning',
        width: '400px',
        height: '50px',
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Carrito vaciado!',
            '',
            'success',
          )
        }
      })
}


