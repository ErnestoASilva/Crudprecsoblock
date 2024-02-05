<script setup>
import { ref, computed  } from 'vue';
import { onMounted } from 'vue';

const isOpen = ref(false);
const users = ref([]);
const cursos = ref([]);
const cursosAlumno = ref([]);
const InscAlumno = ref([]);
const busqueda = ref('');
const nombreMenu = ref('');

const calPracticas = ref('');
const calParcial = ref('');
const calExamen = ref('');
const calFinal = ref('');
const InfoInsc = ref('');
const userType = localStorage.getItem('userType');


onMounted(() => {
    cargarUsers();
    cargarCursos();
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
        if(user.tipoUser == "alumno"){
            users.value.push(user);
        }
    });
};

const cargarCursos = () => {
    cursos.value = [];
    const keys = Object.keys(localStorage).filter(key => key.startsWith('insc_'));

    keys.forEach(key => {
        const curso = JSON.parse(localStorage.getItem(key));
        cursos.value.push(curso);
    });
};

const editarCal = (idUser) => {
    InfoInsc.value = '';
    InscAlumno.value = [];
    for (let index = 0; index < cursos.value.length; index++) {
        if(cursos.value[index].idUser === idUser){
            InscAlumno.value.push(cursos.value[index]);
        }        
    }

    isOpen.value = true;
};

const verCalf = (idUser, nombre) =>{
    nombreMenu.value = nombre;
    cursosAlumno.value = [];
    for (let index = 0; index < cursos.value.length; index++) {
        if(cursos.value[index].idUser === idUser){
            cursosAlumno.value.push(cursos.value[index]);
        }        
    }
};

const handleSelectChange = (event, insc) => {
    calExamen.value = InfoInsc.value.calExamen;
    calParcial.value = InfoInsc.value.calParcial;
    calPracticas.value = InfoInsc.value.calPracticas;
}

const guardarInsc = () =>{

    const inscripcion = {
        idInsc: InfoInsc.value.idInsc,
        idUser: InfoInsc.value.idUser,
        idCurso: InfoInsc.value.idCurso,
        nombreMateria: InfoInsc.value.nombreMateria,
        calPracticas: calPracticas.value,
        calParcial: calParcial.value,
        calExamen: calExamen.value
    };

    localStorage.setItem(InfoInsc.value.idInsc, JSON.stringify(inscripcion));
    cargarCursos();
    let nombreEcontrado = '';
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].idUser === InfoInsc.value.idUser) {
            nombreEcontrado = users.value[i].nombre + " " + users.value[i].appellido;
            break;
        }
    }

    verCalf(InfoInsc.value.idUser, nombreEcontrado);
    limpiarCampos();
    isOpen.value = false;

}

const limpiarCampos = () =>{
    calExamen.value = '';
    calParcial.value = '';
    calPracticas.value = '';
}
</script>

<template>
    <div class="root">
        <div class="contenedor">
            <!-- Lista Alumnos -->
            <div class="contenedor-alumnos">
                <H2 style="margin: .5rem;">Alumnos</H2>
                <!-- <button type="button" class="btn btn-success" @click="isOpen = true;">Añadir Usuario</button> -->
                <input type="text" class="form-control" style="margin: .5rem;" v-model="busqueda" placeholder="Buscar por nombre">
                <div style="margin: .5rem;">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <!-- <th scope="col">No. de Materias</th> -->
                            <th scope="col">Calificaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in usersFiltrados" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ user.nombre + ' ' + user.appellido }}</td>
                                <!-- <td>1</td> -->
                                <td>
                                    <button type="button" class="btn btn-primary" @click="verCalf(user.idUser, (user.nombre + ' ' + user.appellido))">
                                        <i class="bi bi-pencil"></i> Ver
                                    </button>
                                    <button type="button" class="btn btn-info" style="margin-left: .5rem;" @click="editarCal(user.idUser)" v-if="userType == 'docente'">
                                        <i class="bi bi-pencil"></i> Editar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Calificaciones -->
            <div class="contenedor-alumnos">
                <h2 style="margin: .5rem;">Calificaciones</h2>
                <h4 style="margin: .5rem; color: gray;">{{nombreMenu}}</h4>
                <div>
                    <div class="container text-center">
                        <div class="row justify-content-center align-items-center">
                            <!-- Espacio para el nombre de las materias -->
                            <div class="col"></div>
                            <div class="col">Prácticas</div>
                            <div class="col">Parcial</div>
                            <div class="col">Examen</div>
                            <div class="col">Final</div>
                        </div>
                        <div class="row" v-for="(curso, index) in cursosAlumno" :key="index">
                            <!-- Nombre de la materia y calificaciones -->
                            <div class="col text-truncate">{{ curso.nombreMateria }}</div>
                            <div class="col">{{ curso.calPracticas }}</div>
                            <div class="col">{{ curso.calParcial }}</div>
                            <div class="col">{{ curso.calExamen }}</div>
                            <div class="col">{{ ((parseFloat(curso.calPracticas) + parseFloat(curso.calParcial) + parseFloat(curso.calExamen)) / 3).toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <teleport to="body">
            <div class="modal" v-if="isOpen">
            <div>
                <h1>Calificaciones</h1>
                <form @submit.prevent="guardarInsc">       
                <div class="mb-3">
                    <label for="InfoInsc" class="form-label">Seleccionar materia para editar</label>
                    <select class="form-select" id="InfoInsc" v-model="InfoInsc" @change="handleSelectChange($event)" required>
                        <option v-for="(insc, index) in InscAlumno" :key="index" :value="insc">
                            {{ insc.nombreMateria }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="calParcial" class="form-label">Calificación Parcial</label>
                    <input type="number" class="form-control" id="calParcial" v-model="calParcial" required>
                </div>
                <div class="mb-3">
                    <label for="calPracticas" class="form-label">Calificación Practicas</label>
                    <input type="number" class="form-control" id="calPracticas" v-model="calPracticas" required>
                </div>
                <div class="mb-3">
                    <label for="calExamen" class="form-label">Calificación Examen</label>
                    <input type="number" class="form-control" id="calExamen" v-model="calExamen" required>
                </div>
                <div style="display: flex;">
                    <button type="button" class="btn btn-secondary" @click="isOpen = false; limpiarCampos();">Cancelar</button>
                    <button type="submit" class="btn btn-primary" style="margin-left: .5rem;">Guardar</button>
                </div>
                </form>
            </div>
        </div>
        </teleport>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contenedor{
    margin: 2rem;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    column-gap: 10px;
}

.contenedor-alumnos{
    border: 2px solid #dddddd;
    border-radius: 4px;
    padding: .5rem;;
}

.table{
    border: 1px solid #dddddd;
    border-radius: 4px;
 }

 .contenedor-card{
    display: flex;
    flex-direction: column;
}

.card{
    margin: 0.5rem;
    background-color: #d7e7fd;
}

.container{
    border: 2px solid #dddddd;
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

