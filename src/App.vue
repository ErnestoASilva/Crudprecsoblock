<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './logic/userStore'
import navbar from './components/navbar.vue'
import { onMounted } from 'vue'


const userStore = useUserStore()

const isAuthenticated = userStore.userGet.isAuthenticated
const isAuthenticated = userStore.isAuthenticated
</script>

<template>
  <div>
    <navbar v-if="isAuthenticated"></navbar>
    <RouterView />
  </div>
</template>

<style scoped>
</style> -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/navbar.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex';

const store = useStore();


onMounted(() => {
    // Verifica si hay información de autenticación en localStorage
    const isAuthenticated = localStorage.getItem('userType');
    if (isAuthenticated) {
        // Si hay información de autenticación, actualiza el estado del store
        store.dispatch('login', isAuthenticated);
    }
});

</script>

<template>
  <navbar v-if="$store.getters.isAuthenticated"></navbar>
  <!-- <navbar v-if="userType"></navbar> -->
  <RouterView />
</template>

<style scoped>

</style>
