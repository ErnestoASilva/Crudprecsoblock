import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Materias from '../views/Materias.vue'
import Alumnos from '../views/Alumnos.vue'
import Inscripcion from '../views/Inscripcion.vue'
import Notas from '../views/Notas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/inscripcion',
      name: 'inscripcion',
      component: Inscripcion
    },
    {
      path: '/materias',
      name: 'materias',
      component: Materias
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Alumnos
    },
    {
      path: '/notas',
      name: 'notas',
      component: Notas
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
