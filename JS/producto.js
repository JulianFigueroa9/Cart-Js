
class Producto {
    constructor(categoria, nombre, precio, imagen){
        this.categoria = categoria;
        this.nombre = nombre.toUpperCase();
        this.precio = precio * 1.21;
        this.imagen = imagen;
    }

}

