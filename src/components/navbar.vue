<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserStore } from '../logic/userStore';

const store = useStore();
const $router = useRouter();
const userStore = useUserStore();

const userType = localStorage.getItem('userType');

const handleLogout = () => {
  store.dispatch('logout');
  // userStore.logout();

  $router.push('/');
};
</script>


<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand"> Control Escolar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"><RouterLink to="/inscripcion">Inscribirse</RouterLink></a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"><RouterLink to="/notas">Notas</RouterLink></a>
                </li>
                <li class="nav-item" v-if="userType == 'docente'">
                <a class="nav-link" href="#"><RouterLink to="/materias">Cursos</RouterLink></a>
                </li>
                <li class="nav-item" v-if="userType == 'docente'">
                <a class="nav-link" href="#"><RouterLink to="/usuarios">Usuarios</RouterLink></a>
                </li>
            </ul>
            </div>
            <div class="d-flex navbar-brand">
                <button type="button" class="btn btn-secondary" @click="handleLogout">Cerrar Sesión</button>
            </div>
        </div>
    </nav>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
