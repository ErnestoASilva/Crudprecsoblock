<script setup>
import { ref, computed  } from 'vue';
import { onMounted } from 'vue';

const isOpen = ref(false);
const isEditar = ref(false);

const idUser = ref('');
const nombre = ref('');
const appellido = ref('');
const fecha = ref('');
const usuario = ref('');
const password = ref('');
const tipoUser = ref('');

const users = ref([]);


const valorIndex = ref('');
const busqueda = ref('');


onMounted(() => {
    cargarUsers();
});

const usersFiltrados = computed(() => {
    const term = busqueda.value.toLowerCase();
    return users.value.filter(user => user.nombre.toLowerCase().includes(term));
});

const cargarUsers = () => {
    users.value = [];
    const keys = Object.keys(localStorage).filter(key => key.startsWith('user_'));

    keys.forEach(key => {
        const user = JSON.parse(localStorage.getItem(key));
        users.value.push(user);
    });
};

const guardarUser = () => {
    let key = "";
    if(isEditar.value){
        key = idUser.value;
    }else{
        key = `user_${Date.now()}`;
    }

    const user = {
        idUser: key,
        nombre: nombre.value,
        appellido: appellido.value,
        fecha: fecha.value,
        tipoUser: tipoUser.value,
        usuario: usuario.value,
        password: password.value
    };

    localStorage.setItem(key, JSON.stringify(user));
    // users.value.push(user);
    cargarUsers();

    limpiarCampos();
    isOpen.value = false;
    isEditar.value = false;
};

const limpiarCampos = () =>{
    idUser.value = '';
    nombre.value = '';
    appellido.value = '';
    fecha.value = '';
    tipoUser.value = '';
    usuario.value = '';
    password.value = '';
}

const editarUser = (index) => {
    const user = users.value[index];
    valorIndex.value = index;
    idUser.value = user.idUser;
    nombre.value = user.nombre;
    appellido.value = user.appellido;
    fecha.value = user.fecha;
    tipoUser.value = user.tipoUser;
    password.value = user.password;
    usuario.value = user.usuario;
    isOpen.value = true;
    isEditar.value = true;
};

const eliminarUser = (index, idUser) => {
    users.value.splice(index, 1);
    localStorage.removeItem(idUser);
};
</script>

<template>
    <div class="root">
        <div class="encabezado">
        <button type="button" class="btn btn-success" @click="isOpen = true; limpiarCampos()">Añadir Usuario</button>
        <input type="text" class="form-control" v-model="busqueda" placeholder="Buscar por nombre">
        </div>
        <div style="margin: 2rem;">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Fehca de Nacimiento</th>
                    <th scope="col">Tipo de Usuario</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in usersFiltrados" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ user.nombre }}</td>
                        <td>{{ user.appellido }}</td>
                        <td>{{ user.fecha }}</td>
                        <td>{{ user.tipoUser }}</td>
                        <td>{{ user.usuario }}</td>
                        <td>
                            <button type="button" class="btn btn-primary" @click="editarUser(index)">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button type="button" class="btn btn-danger" @click="eliminarUser(index, user.idUser)">
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
                <h1 v-if="isEditar">Editar Usuario</h1>
                <h1 v-else>Crear Nuevo Usuario</h1>
                <form @submit.prevent="guardarUser">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model="nombre" required>
                </div>
                <div class="mb-3">
                    <label for="appellido" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="appellido" v-model="appellido" required>
                </div>
                <div class="mb-3 fecha-tipo">
                    <div>
                        <label for="Fecha" class="form-label">Fecha de Nacimiento</label>
                        <input type="date" class="form-control" id="Fecha" v-model="fecha" required>
                    </div>
                    <div>
                        <label for="tipoUser" class="form-label">Tipo Usuario</label>
                        <select class="form-select" id="tipoUser" v-model="tipoUser" required>
                            <option value="" disabled>Seleccionar tipo de usuario</option>
                            <option value="alumno">Alumno</option>
                            <option value="docente">Docente</option>
                        </select>
                    </div>

                </div>
                <div class="mb-3">
                    <label for="usuario" class="form-label"> Nombre Usuario</label>
                    <input type="text" class="form-control" id="usuario" v-model="usuario" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
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

 .fecha-tipo{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
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

