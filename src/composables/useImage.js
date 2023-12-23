//Para subida de imágenes
import { computed } from "vue"
import { ref as storageRef } from "firebase/storage"
import { useFirebaseStorage, useStorageFile } from "vuefire"
import { uid } from "uid"

export default function useImage() {

   const storage = useFirebaseStorage()
   const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`)

   const {
      url,     // Donde se almacena la url de la imagen
      upload   // Función para subir la imagen
   } = useStorageFile(storageRefPath)

   function uploadImage(e) {
      const data = e.target.files[0]
      if(data){
         upload(data)
      }
   }

   const image  = computed(() => {
      return url.value ? url.value : null
   })

   return {
      url,
      uploadImage,
      image
   }
}