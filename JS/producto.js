class Producto {
    constructor(id, categoria, nombre, precio, imagen){
        this.id = id;
        this.categoria = categoria.toUpperCase();
        this.nombre = nombre.toUpperCase();
        this.precio = precio * 1.21;
        this.imagen = imagen;
    }

}