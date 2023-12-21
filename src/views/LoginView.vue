<script setup>
   import { useForm, useField } from 'vee-validate'
   import { loginSchema as validationSchema } from '../validation/loginSchema'

   const { handleSubmit } = useForm({
      validationSchema
   })

   const email = useField('email')
   const password = useField('password')

   console.log(email)

   const submit = handleSubmit(()=>{
      console.log('submit...')
   }) 

</script>

<template>
   <v-card
      flat
      max-width="600"
      class="mx-auto my-10"
   >
      <v-card-title
         class="text-h4 font-weight-bold"
      >
         Iniciar Sesion
      </v-card-title>
      <v-card-subtitle>
         Inicia sesion con tu cuenta
      </v-card-subtitle>
      <v-form class="mt-5">
         <v-text-field
            type="email"
            label="Email"
            bg-color="blue-grey-lighten-5"
            class="mb-2"
            required
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
         >
         </v-text-field>
         <v-text-field
            type="password"
            label="Password"
            bg-color="blue-grey-lighten-5"
            class="mb-2"
            required
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
         >
         </v-text-field>
         <v-btn
            block   
            color="pink-accent-3"
            @click="submit"
         >
            Iniciar Sesion
         </v-btn>
      </v-form>
   </v-card>

</template>
