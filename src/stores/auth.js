import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from  'vue-router'

export const useAuthStore = defineStore('auth', () => {

   const auth = useFirebaseAuth()
   const authUser = ref(null)
   const router = useRouter()

   const errorMsg = ref('')
   const errorCodes = {
         'auth/invalid-email': 'Email inválido',
         'auth/user-disabled': 'Usuario desabilitado',
         'auth/user-not-found': 'Usuario no encontrado',
         'auth/wrong-password': 'Contraseña incorrecta',
         'auth/invalid-credential': 'Credenciales inválidas'
      }

   onMounted(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            authUser.value = user
         }
      })
   })

   const login = ({ email,password }) => {
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;
            authUser.value = user
            router.push({ name: 'admin-propiedades' })
         })
         .catch( error => {
            console.log(error)
            errorMsg.value = errorCodes[error.code];
         });
   }

   const logOut = () => {
      signOut(auth)
         .then(() => {
            authUser.value = null
            router.push({ name: 'login' })
         })
         .catch((error) => {
            console.log(error)
         });
   }

   const hasError = computed(() => errorMsg.value)

   const isAuth = computed(() =>{
      return authUser.value
   })

   return{
      login,
      logOut,
      hasError,
      errorMsg,
      isAuth
   }
})