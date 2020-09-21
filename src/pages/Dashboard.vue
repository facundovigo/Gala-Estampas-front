<template>
  <div class="contenedor">
    <div class=" md-layout  md-alignment-top-center" >
        <CardProduct  class=" md-alignment-center" v-for="(product, index) in getMenus()" :key="index" :post=product></CardProduct> 
    <div >   
    </div >
    <div class="md-layout  md-alignment-top-center">
      <md-button class="md-raised md-gala md-round ">
        <span class="material-icons" >keyboard_arrow_left</span>
      </md-button>
      <md-button class="md-raised md-gala md-round ">
        <span class="material-icons" >keyboard_arrow_right</span>
      </md-button>
    </div>
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
      datos: [],
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
      }).catch(console.error("error"));
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
  margin-top: 3rem;
  /* margin-left: 4rem; */

}

</style>