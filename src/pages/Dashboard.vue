<template>
    <div class="contenedor">
        <CardProduct  v-for="(product, index) in getMenus()" :key="index" :post=product></CardProduct> 
    <div >
      <md-button class="md-raised md-gala md-round jet">
        <span class="material-icons" >keyboard_arrow_left</span>
      </md-button>
      <md-button class="md-raised md-gala md-round ">
        <span class="material-icons" >keyboard_arrow_right</span>
      </md-button>
      </div>
    </div>  
</template>

<script>
import chunk from "lodash/chunk" ;
import {
  CardProduct
} from "@/components";

export default {
  components: {
     CardProduct
  },
  mounted(){
            this.menuss()
  },
  data(){
    return{
      products:[1,2,3,4,5,6,7,8],
      datos: [
          {
            id: 1,
            name: "Cartuchera",
            url: "faces/cartuchera.jpg",
            categoria: "/Cartuchera.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          {
            name: "Set De MAte",
            url: "faces/setDeMate.jpg",
            categoria: "/Mate.png",
            info: "Set armado con todo lo nesesario para el mate",
            cabecera: "La Mejor Opcion para tus Juntadas"
          },
          {
            name: "PortaCosmeticos",
            url: "faces/portacosmetico.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          {
            name: "Taza DE Ceramica",
            url: "faces/tazaDeceramica.jpg",
            categoria: "/Taza.png",
            info: "Taza estampada Reforzada",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          {
            name: "Set Porta Cosmeticos",
            url: "faces/SetPortaCosmeticos3.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          {
            name: "Set Porta Cosmeticos",
            url: "faces/portacosmeticos4.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          {
            name: "Set De Mate",
            url: "faces/setDeMate.jpg",
            categoria: "/Mate.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
          {
            name: "Set Porta Cosmeticos",
            url: "faces/setPortaCosmeticos.jpg",
            categoria: "/Portacosmeticos.png",
            info: "Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados Cierre reforzado Personalizalo como elijas",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },
      ],
      menus: {},
      page: 0,
    }
  },
  methods:{
    menuss(){
    let r = this.datos
    this.menus = chunk(r,8)
    },
    setPage(r){
      return this.page=r
    },
    previus(){
      if (this.page !== 0) this.page = this.page -1
    },
    nextt(){
      if (this.page !== this.menus.length -1 ) this.page ++
    },
    getMenus(){
      return this.menus[this.page]
    },
  }
}
</script>

<style scoped>


.contenedor{
  /* display: row; */
  /* grid-template-columns: repeat(2, 1fr);  */
  margin-top: 5rem;
  margin-left: 1rem; 
}
.facu{
  margin-left: 40% ;
  
}
.md-raised{
  margin-left: 40% ;
  margin-top: 4%;
}

</style>