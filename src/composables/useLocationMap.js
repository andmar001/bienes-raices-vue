import { ref } from 'vue'

export default function useLocationMap() {

   const zoom = ref(17)
   const center = ref({ lat: 20.6911575, lng: -101.2607125 })

   return{
      zoom,
      center
   }
}