import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire' 
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propiedad/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/admin',
      name:'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta:{ requiresAuth: true }, //Guard de navegación
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue')
        },
        {
          path: '/admin/editar/:id',
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue')
        }
      ]
    }
  ]
})

//Guard de navegación
router.beforeEach(async( to, from, next)=>{
  //Comprobar si la ruta requiere autenticación
  const requiresAuth = to.matched.some( url => url.meta.requiresAuth )
  if (requiresAuth) {
    //Comprobar que el usuario este autenticado
    try {
      await autenticateUser()
      next()
    } catch (error) {
        console.log('error');
        next({ name: 'login'})
    }
  } 
  else{
    //Si no requiere autenticación, se puede acceder a la ruta
    next()
  }
})

function autenticateUser(){
  const auth = useFirebaseAuth()
  return new Promise((resolve, reject) => {
    const onSuscribe = onAuthStateChanged(auth, (user) => {
      onSuscribe() //Dejar de escuchar el evento, para que no se quede escuchando
      if (user) {
        resolve(user)
      }
      else{
        reject('Usuario no autenticado') //Si no hay usuario autenticado, se rechaza la promesa y va al catch por lo que lleva al login
      }
    })
  });
}

export default router
