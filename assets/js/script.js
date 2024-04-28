document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('boton_agregar').addEventListener('click', agregarTarea);
});

let tareas = [];
let nextId = 1;

function agregarTarea() {
    const inputTarea = document.getElementById('nueva_tarea');
    const valorTarea = inputTarea.value.trim();
    if (valorTarea) {
        tareas.push({ id: nextId++, descripcion: valorTarea, completada: false });
        inputTarea.value = '';
        actualizarListaTareas();
    }
}

function eliminarTarea(id) {
    const indice = tareas.findIndex(tarea => tarea.id === id);
    if (indice !== -1) {
        tareas.splice(indice, 1);
        actualizarListaTareas();
    }
}

function cambiarEstadoTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        actualizarListaTareas();
    }
}

function actualizarListaTareas() {
    const lista = document.getElementById('lista_tareas');
    lista.innerHTML = '';
    tareas.forEach(tarea => {
        let fila = lista.insertRow();
        fila.insertCell(0).textContent = tarea.id;
        fila.insertCell(1).textContent = tarea.descripcion;
        if (tarea.completada) {
            fila.classList.add('completada');
        }

        let celdaCheckbox = fila.insertCell(2);
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;
        checkbox.addEventListener('change', () => cambiarEstadoTarea(tarea.id));
        celdaCheckbox.appendChild(checkbox);

        let celdaEliminar = fila.insertCell(3);
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarTarea(tarea.id));
        celdaEliminar.appendChild(botonEliminar);
    });

    document.getElementById('total_tareas').textContent = tareas.length;
    document.getElementById('tareas_realizadas').textContent = tareas.filter(tarea => tarea.completada).length;
}
