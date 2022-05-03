
const productos = [];

productos.push(new Producto(1, "Tortas Personalizadas", "Torta Cars", 1900, "./imagenes/galeria2.jpg"));
productos.push(new Producto(2, "Tortas Personalizadas", "Torta Instituto", 1800, "./imagenes/galeria1.jpg"));
productos.push(new Producto(3, "Tortas Personalizadas", "Torta Fernet", 2100, "./imagenes/tortapersonalizada1.jpg"));
productos.push(new Producto(4,"Tortas Personalizadas", "Torta Letra", 1700, "./imagenes/galeria9.jpg"));
productos.push(new Producto(5, "Tortas Personalizadas", "Torta Among Us", 2000, "./imagenes/galeria5.jpg"));
productos.push(new Producto(6, "Tortas y Tartas", "Pavlova", 2000,"./imagenes/pavlova.jpg"));
productos.push(new Producto(7, "Boxes", "Box Cumpleaños", 2500,"./imagenes/boxcumpleanios.jpg"));
productos.push(new Producto(8, "Boxes", "Box Dripcake", 2700,"./imagenes/boxdripcake.jpg"));
productos.push(new Producto(9, "Boxes", "Box Minicakes", 2000,"./imagenes/boxminicakes.jpg"));
productos.push(new Producto(10, "Boxes", "Box Navidad", 1900,"./imagenes/boxnavidad.jpg"));
productos.push(new Producto(11, "Boxes", "Box Niño", 2000,"./imagenes/boxninio.jpg"));
productos.push(new Producto(12, "Especialidades", "Cupcake", 150,"./imagenes/especialidad1.jpg"));
productos.push(new Producto(13, "Especialidades", "Budín", 250,"./imagenes/especialidad2.jpg"));
productos.push(new Producto(14, "Especialidades", "Popcake", 100, "./imagenes/especialidadpopcake.jpg"));
productos.push(new Producto(15, "Especialidades", "Ice Popcake", 200, "./imagenes/especialidadpopcake2.jpg"));

let carrito = [];

let items = document.querySelector("#items");
let carritoDOM = document.querySelector("#carrito");
let total = document.querySelector("#total");
let btnVaciar = document.querySelector("#botonVaciar");
let miLocalStorage = window.localStorage;
const claveLocalStorage = "compraCarrito";


function productosALaVenta(){
    fetch('./data/productos.json')
    .then(response => response.json())
    .then(data =>{
        data.forEach((dato) =>{
            let nodo = document.createElement("div");

            let nodoCuerpo = document.createElement("div");
            nodoCuerpo.classList.add("cuerpoProductos")

            let nodoCategoria = document.createElement("h4");
            nodoCategoria.textContent = dato.categoria;
            nodoCategoria.classList.add("tituloCategoria");

            let nodoTitulo = document.createElement("h5");
            nodoTitulo.textContent = dato.nombre;
            nodoTitulo.classList.add("tituloProducto");
            

            let nodoImagen = document.createElement("img");
            nodoImagen.setAttribute("src", dato.imagen);
            nodoImagen.classList.add("fotos");

            let nodoPrecio = document.createElement("p");
            nodoPrecio.textContent = `$${dato.precio}`;
            nodoPrecio.classList.add("precio")

            let btn = document.createElement("button");
            btn.textContent = "Comprar";
            btn.classList.add("btnComprar")
            btn.setAttribute("id", dato.id);
            btn.addEventListener('click', agregarProductoAlCarrito);
            
            
            items.appendChild(nodo);
            nodo.appendChild(nodoCuerpo);
            nodoCuerpo.appendChild(nodoCategoria);
            nodoCuerpo.appendChild(nodoTitulo);
            nodoCuerpo.appendChild(nodoImagen);
            nodoCuerpo.appendChild(nodoPrecio);
            nodoCuerpo.appendChild(btn);
        });
    });
}

function agregarProductoAlCarrito(evento){
    carrito.push(evento.target.getAttribute("id"));
    actualizarCarrito();
    guardarCarritoEnLS()
    Swal.fire({
        title: '¡Producto añadido al carrito!',
        icon: 'success',
        width: '400px',
        timer: 1000,
        allowEscapeKey: true,
        confirmButtonColor: '#3085d6',
    });
}

function actualizarCarrito(){
    carritoDOM.textContent = "";

    let carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {

        let miItem = productos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        
        let cantUnidades = carrito.reduce((total, itemId) => {
        return itemId === item ? total+= 1 :total;
        },0);
        
        let lista = document.createElement("li");
        lista.textContent = `${cantUnidades} x ${miItem[0].nombre} - $${miItem[0].precio}`;

        let btnBorrar = document.createElement("button");
        btnBorrar.textContent = "X";
        btnBorrar.classList.add("btnX");
        btnBorrar.dataset.item = item;
        btnBorrar.addEventListener("click", borrarItem);

        lista.appendChild(btnBorrar);
        carritoDOM.appendChild(lista);

    });
    total.textContent = calcularTotal();
}

function borrarItem(evento){
    let id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) =>{
        return carritoId !== id;
    });

    actualizarCarrito();
    guardarCarritoEnLS();
}

function calcularTotal(){
    return carrito.reduce((total, item) =>{
        let miItem = productos.filter ((itemProductos) =>{
            return itemProductos.id === parseInt(item);
        });
        
        return total + miItem[0].precio;
    },0);
}

function vaciarCarrito(){
    carrito = [];
    actualizarCarrito();
    localStorage.clear();
    
    Swal.fire({
    title: '¡Carrito vaciado!',
    icon: 'success',
    width: '400px',
    timer: 1000,
    allowEscapeKey: true,
    confirmButtonColor: '#3085d6',
    });
}

function guardarCarritoEnLS () {
    miLocalStorage.setItem(claveLocalStorage, JSON.stringify(carrito));
}

function cargarCarritoDeLS () {
    if (miLocalStorage.getItem(claveLocalStorage) !== null) {
        carrito = JSON.parse(miLocalStorage.getItem(claveLocalStorage));
    }
}

btnVaciar.addEventListener("click", vaciarCarrito);

cargarCarritoDeLS();
productosALaVenta();
actualizarCarrito();



