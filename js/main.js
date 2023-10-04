//PRODUCTOS

const productos = [
    //JUJUTSU KAISEN
    {
        id: "jjk-00",
        titulo: "Jujutsu Kaisen VOL 0",
        imagen: "./img/jjk/jjk-vol0.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    {
        id: "jjk-01",
        titulo: "Jujutsu Kaisen VOL 1",
        imagen: "./img/jjk/jjk-vol1.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    {
        id: "jjk-02",
        titulo: "Jujutsu Kaisen VOL 2",
        imagen: "./img/jjk/jjk-vol2.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    {
        id: "jjk-03",
        titulo: "Jujutsu Kaisen VOL 3",
        imagen: "./img/jjk/jjk-vol3.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    {
        id: "jjk-04",
        titulo: "Jujutsu Kaisen VOL 4",
        imagen: "./img/jjk/jjk-vol4.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    {
        id: "jjk-05",
        titulo: "Jujutsu Kaisen VOL 5",
        imagen: "./img/jjk/jjk-vol5.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    {
        id: "jjk-06",
        titulo: "Jujutsu Kaisen VOL 6",
        imagen: "./img/jjk/jjk-vol6.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    {
        id: "jjk-07",
        titulo: "Jujutsu Kaisen VOL 7",
        imagen: "./img/jjk/jjk-vol7.jpeg",
        categoria: {
            nombre: "SHONEN",
            id: "shonen"
        },
        precio: 3000,
    },
    
    //BERSERK
    {
        id: "brk-01",
        titulo: "Berserk VOL 0",
        imagen: "./img/berserk/berserk-01.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },
    {
        id: "brk-02",
        titulo: "Berserk VOL 2",
        imagen: "./img/berserk/berserk-02.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },{
        id: "brk-03",
        titulo: "Berserk VOL 3",
        imagen: "./img/berserk/berserk-03.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },{
        id: "brk-04",
        titulo: "Berserk VOL 4",
        imagen: "./img/berserk/berserk-04.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },
    {
        id: "brk-05",
        titulo: "Berserk VOL 5",
        imagen: "./img/berserk/berserk-05.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },
    {
        id: "brk-06",
        titulo: "Berserk VOL 6",
        imagen: "./img/berserk/berserk-06.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },
    {
        id: "brk-07",
        titulo: "Berserk VOL 7",
        imagen: "./img/berserk/berserk-07.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },
    {
        id: "brk-08",
        titulo: "Berserk VOL 8",
        imagen: "./img/berserk/berserk-08.jpg",
        categoria: {
            nombre: "SEINEN",
            id: "seinen"
        },
        precio: 3000,
    },
]



//EJECUCION


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const productosCarro = []
const numerito = document.querySelector("#numerito")


function actualizarNumero () {
    let nuevoNumero = productosCarro.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
}



function agregarAlCarrito (e) {
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
}


function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
        
    });
}

function cargarProductos (productosElegidos) {
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



cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })

})

localStorage.setItem("productos-carro", JSON.stringify(productosCarro))




