<script setup>

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
            required
         >
         </v-text-field>
         <v-text-field
            type="password"
            label="Password"
            bg-color="blue-grey-lighten-5"
            required
         >
         </v-text-field>
         <v-btn
            block   
            color="pink-accent-3"
         >
            Iniciar Sesion
         </v-btn>
      </v-form>
   </v-card>

</template>
