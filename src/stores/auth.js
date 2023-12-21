import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';


export const useAuthStore = defineStore('auth', () => {

   const auth = useFirebaseAuth()

   
const errorCodes = {
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuario desabilitado',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
   }
   const login = ({ email,password }) => {
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in 
            console.log(userCredential)
         })
         .catch( error => {
            // console.log(errorCodes[error.code])
            console.log(error)
         });
   }

   return{
      login
   }
})