let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


//EJECUCION


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito")


let productosCarro;

let productosCarroLS = localStorage.getItem("productos-en-carrito")

if (productosCarroLS) {
    productosCarro = JSON.parse(productosCarroLS);
    actualizarNumero();
} else {
    productosCarro = [];
}




function actualizarNumero() {
    let nuevoNumero = productosCarro.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
}


function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, red, rgb(236, 151, 151))",
            borderRadius: "1rem",
            textTransform: "uppercase",
            fontSize: "0.75rem",
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productosAgregados = productos.find(producto => producto.id === idBoton);

    if (productosCarro.some(producto => producto.id === idBoton)) {
        const index = productosCarro.findIndex(producto => producto.id === idBoton);
        productosCarro[index].cantidad++;

    } else {
        productosAgregados.cantidad = 1;
        productosCarro.push(productosAgregados)
    }

    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarro));
}


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)

    });
}

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar al carro</button> 
        </div>
        
        `;

        contenedorProductos.append(div)
    })
    actualizarBotonesAgregar();
}





botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })

})





