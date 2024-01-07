import { computed, ref } from 'vue';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';

export default function usePropiedades() {

   const alberca = ref(false)

   //Obtener la referencia a la colección de propiedades de la base de datos de Firestore
   const db = useFirestore()
   const propiedadesCollection = useCollection(collection(db, 'propiedades'))

   //Filtrar las propiedades por alberca
   const propiedadesFiltradas = computed(() => {
      return alberca.value ?
         propiedadesCollection.value.filter(propiedad => propiedad.alberca) :
         propiedadesCollection.value
   })

   return {
      propiedadesCollection,
      propiedadesFiltradas,
      alberca
   }
}