import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {

   const auth = useFirebaseAuth()
   const authUser = ref(null)

   const errorMsg = ref('')
   const errorCodes = {
         'auth/invalid-email': 'Email inválido',
         'auth/user-disabled': 'Usuario desabilitado',
         'auth/user-not-found': 'Usuario no encontrado',
         'auth/wrong-password': 'Contraseña incorrecta',
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

            console.log(authUser.value)
         })
         .catch( error => {
            console.log(error)
            errorMsg.value = errorCodes[error.code];
         });
   }

   const hasError = computed(() => errorMsg.value)

   return{
      login,
      hasError,
      errorMsg
   }
})