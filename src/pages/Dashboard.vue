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
import API from '../service/api'
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
      datos: [
          /*{
            article: 2,
            description: "Portacosmético de corte recto con cierre. Medidas 17 x 21 cm. Como todos nuestros productos se puede personalizar.",
            id: 5,
            inscription: "",
            name: "Portacosmetico",
            price: 400,
            stamp: "http://localhost:8000/uploads/product_stamp/portacosmetico_17x21.jpeg",

            categoria: "/Cartuchera.png",
            cabecera: "La mejor opcion para guardar todas tus cosas"
          },*/
 
      ],
      menus: {},
      page: 0,
    }
  },
  methods:{
    menuss(){
      API.get('/api/product/').then( resp => {
        this.datos = resp 
        let r = this.datos
        this.menus = chunk(r,8)
      })
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