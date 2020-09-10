<template>
    <div class="contenedor">
         
        <!-- <div  v-for="(product, index) in products" :key="index">
        <CardProduct></CardProduct>
         </div>       -->
        <CardProduct :post=datos.item1></CardProduct>
        <CardProduct :post=datos.item2></CardProduct>
        <CardProduct :post=datos.item3></CardProduct>
        <CardProduct :post=datos.item4></CardProduct>
        <CardProduct :post=datos.item5></CardProduct>
        <CardProduct :post=datos.item6></CardProduct>
        <CardProduct :post=datos.item7></CardProduct>
        <CardProduct :post=datos.item8></CardProduct>
        
      
    </div>  
</template>

<script>
import {
  CardProduct
} from "@/components";

export default {
  components: {
     CardProduct
  },
  data(){
    return{
      products:[1,2,3,4,5,6,7,8],
      datos: {
          item1:{
            name: "Cartuchera",
            url: "faces/cartuchera.jpg",
            categoria: "/Cartuchera.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          item2:{
            name: "Set De MAte",
            url: "faces/setDeMate.jpg",
            categoria: "/Mate.png",
            info: "Set armado con todo lo nesesario para el mate",
            cabecera: "La Mejor Opcion para tus Juntadas"
          },
          item3:{
            name: "PortaCosmeticos",
            url: "faces/portacosmetico.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          item4:{
            name: "Taza DE Ceramica",
            url: "faces/tazaDeceramica.jpg",
            categoria: "/Taza.png",
            info: "Taza estampada Reforzada",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          item5:{
            name: "Set Porta Cosmeticos",
            url: "faces/SetPortaCosmeticos3.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          item6:{
            name: "Set Porta Cosmeticos",
            url: "faces/portacosmeticos4.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          item7:{
            name: "Set De Mate",
            url: "faces/setDeMate.jpg",
            categoria: "/Mate.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          item8:{
            name: "Set Porta Cosmeticos",
            url: "faces/setPortaCosmeticos.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
      }
    }
  }
}
</script>

<style scoped>
/* .contenedor{

display: row;
/* grid-template-columns: repeat(4);   
margin-top: 4rem;
} */
.grid-container{
  display: grid; 
  /* grid-template-columns: repeat(4, auto); */
}

.contenedor{
  /* display: row; */
  /* grid-template-columns: repeat(2, 1fr);  */
  margin-top: 3rem;
  margin-left: 1rem; 
/* grid-template-columns: repeat(4);   */
margin-top: 3rem;
margin-left: 1rem;
}

</style>