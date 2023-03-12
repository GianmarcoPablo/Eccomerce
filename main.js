const listaCursos = document.querySelector('.main__listaCursos');
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const cursoAgregado = document.querySelectorAll('.main__btn');
let articulosCarrito = []

cargarEvenlisteners();

function cargarEvenlisteners(){
    listaCursos.addEventListener('click', agregarCurso);
    cursoAgregado.forEach(btn => {
        btn.addEventListener('click', mensajeCursoAgregado);
    });
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("main__btn")){
        const cursoSeleccionado = e.target.parentElement    
        leerDatosCurso(cursoSeleccionado);
        console.log(cursoSeleccionado);
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('p').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    articulosCarrito = [...articulosCarrito, infoCurso];
    carritoHtml();
}

function carritoHtml(){
    limpiarHtml();
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function mensajeCursoAgregado(e){
    const parrafo = document.createElement('p');
    parrafo.textContent = "Curso agregado al carrito";
    parrafo.classList.add('mensaje');
    e.target.parentElement.parentElement.appendChild(parrafo);
    setTimeout(() => {
        parrafo.remove();
    }, 3000);
}
