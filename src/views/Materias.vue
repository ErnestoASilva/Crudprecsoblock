<script setup>
import { ref, computed  } from 'vue';
import { onMounted } from 'vue';

const isOpen = ref(false);
const isEditar = ref(false);

const nombre = ref('');
const descripcion = ref('');
const duracion = ref('');
const idCurso = ref('');
const valorIndex = ref('');

const cursos = ref([]);
const busqueda = ref('');


onMounted(() => {
    cargarCursos();
});

const cursosFiltrados = computed(() => {
    const term = busqueda.value.toLowerCase();
    return cursos.value.filter(curso => curso.nombre.toLowerCase().includes(term));
});

const cargarCursos = () => {
    cursos.value = [];
    const keys = Object.keys(localStorage).filter(key => key.startsWith('curso_'));

    keys.forEach(key => {
        const curso = JSON.parse(localStorage.getItem(key));
        cursos.value.push(curso);
    });
};

const guardarCurso = () => {
    let key = "";
    if(isEditar.value){
        key = idCurso.value;
    }else{
        key = `curso_${Date.now()}`;
    }

    const curso = {
        idCurso: key,
        nombre: nombre.value,
        descripcion: descripcion.value,
        duracion: duracion.value
    };

    localStorage.setItem(key, JSON.stringify(curso));
    // cursos.value.push(curso);
    cargarCursos();

    limpiarCampos();
    isOpen.value = false;
    isEditar.value = false;
};

const limpiarCampos = () =>{
  nombre.value = '';
  descripcion.value = '';
  duracion.value = '';
}

const editarCurso = (index) => {
    const curso = cursos.value[index];
    valorIndex.value = index;
    idCurso.value = curso.idCurso;
    nombre.value = curso.nombre;
    descripcion.value = curso.descripcion;
    duracion.value = curso.duracion;
    isOpen.value = true;
    isEditar.value = true;
};

const eliminarCurso = (index, idCurso) => {
    cursos.value.splice(index, 1);
    localStorage.removeItem(idCurso);
};
</script>

<template>
    <div class="root">
        <div class="encabezado">
        <button type="button" class="btn btn-success" @click="isOpen = true; limpiarCampos()">Añadir Curso</button>
        <input type="text" class="form-control" v-model="busqueda" placeholder="Buscar por nombre">
        </div>
        <div style="margin: 2rem;">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Duración</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(curso, index) in cursosFiltrados" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ curso.nombre }}</td>
                        <td>{{ curso.descripcion }}</td>
                        <td>{{ curso.duracion }}</td>
                        <td>
                            <button type="button" class="btn btn-primary" @click="editarCurso(index)">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button type="button" class="btn btn-danger" @click="eliminarCurso(index, curso.idCurso)">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <teleport to="body">
            <div class="modal" v-if="isOpen">
            <div>
                <h1 v-if="isEditar">Editar Curso Existente</h1>
                <h1 v-else>Crear Nuevo Curso</h1>
                <form @submit.prevent="guardarCurso">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model="nombre" required>
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3" v-model="descripcion" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="duracion" class="form-label">Duración</label>
                    <input type="text" class="form-control" id="duracion" v-model="duracion" required>
                </div>
                <div style="display: flex; justify-content: end;">
                    <button type="button" class="btn btn-secondary" @click="isOpen = false; isEditar= false">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
                </form>
            </div>
        </div>
        </teleport>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .table{
    /* margin: 2rem; */
    border: 2px solid #dddddd;
    border-radius: 4px;
 }

 .btn{
    margin-right: 10px;
 }
 .encabezado{
    margin: 2rem;
    display: grid;
    grid-template-columns: 1fr 4fr;
 }

 /* MODAL */
 .root{
    position: relative;
 }

 .modal{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
 }

 .modal > div {
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
 }
</style>

