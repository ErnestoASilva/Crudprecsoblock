<!-- src/components/Login.vue -->
<template>
    <div class="contenedor">
      <form class="contenedor--login" @submit.prevent="handleSubmit">
        <h2 class="titulo">Control Escolar</h2>
        <div class="mb-3">
          <label for="username" class="form-label">Nombre de Usuario</label>
          <input v-model="username" type="text" class="form-control" id="username">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <button type="submit" class="btn btn-primary">Ingresar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router'
  import users from '../logic/users.json';
  import { ref  } from 'vue';
  import { useUserStore } from '../logic/userStore';


  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleSubmit() {
      const userStore = useUserStore();
      const user = users.find(u => u.usuario === this.username && u.password === this.password);
      if (user) {
        this.$store.dispatch('login', user.tipoUser);
        // userStore.login(user.tipoUser);

        localStorage.setItem('userSession', JSON.stringify(user));
        this.$router.push('/inscripcion');
      } else {
        const usersLocalStorage = ref([]);
        const keys = Object.keys(localStorage).filter(key => key.startsWith('user_'));
        keys.forEach(key => {
          const user = JSON.parse(localStorage.getItem(key));
          usersLocalStorage.value.push(user);
        });
        const userLocalStorage = usersLocalStorage.value.find(u => u.usuario === this.username && u.password === this.password);
        if (userLocalStorage) {
          this.$store.dispatch('login', userLocalStorage.tipoUser);
          // userStore.login(userLocalStorage.tipoUser);

          localStorage.setItem('userSession', JSON.stringify(userLocalStorage));
          this.$router.push('/inscripcion');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      }
    },
  },
};
  </script>
  
  <style scoped>
    .contenedor{
      background-color: #303434; 
      padding: 20%;
      padding-top: 10%;
  
    }
    .contenedor--login{
      display: flex;
      flex-direction: column;
      background-color: white;
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding-top: 10%;
      padding-bottom: 10%;
    }
    .titulo{
      font-weight: bold;
      margin-bottom: 30px;
      text-align: center;
    }
    .form-label{
      margin-left: 20%;
    }
    .form-control{
      width: 60%;
      margin-left: 20%;
      margin-right: 20%;
    }
    .btn{
      width: 40%;
      margin-left: 30%;
      margin-right: 30%;
    }
  </style>