export const propertyPrice = ( price ) => 
      Number(price).toLocaleString('es-US', {
         style: 'currency',
         currency: 'USD'
      }) 
