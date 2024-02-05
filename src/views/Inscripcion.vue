<script setup>
import { ref, computed  } from 'vue';
import { onMounted } from 'vue';

const cursos = ref([]);
const cursosInscrito = ref([]);
const userSession = JSON.parse(localStorage.getItem('userSession'));


onMounted(() => {
    cargarCursos();
});

const cargarCursos = () => {
    cursos.value = [];
    cursosInscrito.value = [];
    const keys = Object.keys(localStorage).filter(key => key.startsWith('curso_') || key.startsWith('insc_'));

    keys.forEach(key => {
        if (key.startsWith('curso_')) {
            const curso = JSON.parse(localStorage.getItem(key));
            if (esCursoInscrito(curso)) {
                cursosInscrito.value.push(curso);
            } else {
                cursos.value.push(curso);
            }
        }
    });
};

const esCursoInscrito = (curso) => {
    const inscripcionKeys = Object.keys(localStorage).filter(key => key.startsWith('insc_'));
    return inscripcionKeys.some(key => {
        const inscripcion = JSON.parse(localStorage.getItem(key));
        return inscripcion.idCurso === curso.idCurso && inscripcion.idUser === userSession.idUser;
    });
};

const inscribirse = (curso) => {
    let key = `insc_${Date.now()}`;
    const userSession = JSON.parse(localStorage.getItem('userSession'));


    const inscripcion = {
        idInsc: key,
        idUser: userSession.idUser,
        idCurso: curso.idCurso,
        nombreMateria: curso.nombre,
        calPracticas: 0,
        calParcial: 0,
        calExamen: 0
    };

    localStorage.setItem(key, JSON.stringify(inscripcion));
    cargarCursos();
};

const cancelarMateria = (curso) => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const inscripcionKey = Object.keys(localStorage).find(key => key.startsWith('insc_') && JSON.parse(localStorage.getItem(key)).idUser === userSession.idUser && JSON.parse(localStorage.getItem(key)).idCurso === curso.idCurso);

    if (inscripcionKey) {
        localStorage.removeItem(inscripcionKey);
        cargarCursos();
    }
};

</script>

<template>
  <div class="contenedor">
    <!-- Disponibles -->
    <h2>Materias Disponibles</h2>
    <div class="contenedor-card">
        <div class="card" style="width: 18rem;" v-for="(curso, index) in cursos" :key="index">
            <div class="card-body">
                <h5 class="card-title">Materia: {{curso.nombre}}</h5>
                <p class="card-text">Descripción: {{curso.descripcion}}</p>
                <p class="card-text">Horas: {{curso.duracion}}</p>
                <a href="#" class="btn btn-primary" @click="inscribirse(curso)">Inscribirse</a>
            </div>
        </div>
    </div>
    <!-- Inscrito -->
    <div style="margin-top: .5rem;">
        <h2>Tus Materias</h2>
        <div class="contenedor-card">
            <div class="card" style="width: 18rem;" v-for="(curso, index) in cursosInscrito" :key="index">
                <div class="card-body">
                    <h5 class="card-title">Materia: {{curso.nombre}}</h5>
                    <p class="card-text">Descripción: {{curso.descripcion}}</p>
                    <p class="card-text">Horas: {{curso.duracion}}</p>
                    <a href="#" class="btn btn-danger" @click="cancelarMateria(curso)">Cancelar</a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contenedor{
    margin: 2rem;
    border: 2px solid #dddddd;
    border-radius: 4px;
    padding: 1rem;
}
.contenedor-card{
    display: flex;
    flex-wrap: wrap;
}

.card{
    margin: 0.5rem;
    background-color: #d7e7fd;
}

</style>

