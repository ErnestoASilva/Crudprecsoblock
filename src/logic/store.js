// src/store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    userType: null, // 'docente' o 'alumno'
  },
  mutations: {
    login(state, userType) {
      state.isAuthenticated = true;
      state.userType = userType;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userType = null;
    },
  },
  actions: {
    login({ commit }, userType) {
      // Aquí podrías realizar una llamada a una API para autenticar al usuario,
      // pero en este caso simularemos el login con localStorage
      localStorage.setItem('userType', userType);
      commit('login', userType);
    },
    logout({ commit }) {
      localStorage.removeItem('userType');
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userType: state => state.userType,
  },
});
