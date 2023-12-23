import { computed } from 'vue';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';

export default function usePropiedades() {

   //Obtener la referencia a la colección de propiedades de la base de datos de Firestore
   const db = useFirestore()
   const propiedadesCollection = useCollection(collection(db, 'propiedades'))

   const propertyPrice = computed(() => {
      return ( price ) => 
         Number(price).toLocaleString('es-US', {
            style: 'currency',
            currency: 'USD'
         }) 
   })

   return {
      propiedadesCollection,
      propertyPrice
   }
}