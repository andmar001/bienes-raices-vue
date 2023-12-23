import { ref } from 'vue'

export default function useLocationMap() {

   const zoom = ref(17)
   const center = ref({ lat: 20.6911575, lng: -101.2607125 })

   function pin(e){
      const marker = e.target.getLatLng()
      center.value = [marker.lat, marker.lng]
   }

   return{
      zoom,
      center,
      pin
   }
}