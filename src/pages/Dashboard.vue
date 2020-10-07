<template>
  <div class="content">
  <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
    <div>
     <div  class=" md-layout  md-alignment-top-center" v-if="!emptyProducts()" >
          <CardProduct  class=" md-alignment-center" v-for="(product, index) in getMenus()" :key="index" :post=product></CardProduct> 
    </div>
    <div class="md-layout  md-alignment-top-center" v-else>
    
          <CardNoProduct></CardNoProduct>
    </div>  

    <div class="md-layout  md-alignment-top-center block" v-if="showButtons()" >
      <md-button class="md-raised md-gala md-round " v-on:click="previus">
        <span class="material-icons" >keyboard_arrow_left</span>
      </md-button>
      <md-button class="md-raised md-gala md-round " v-on:click="nextt">
        <span class="material-icons" >keyboard_arrow_right</span>
      </md-button>
    </div>
    </div>
          <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage"></fixed-plugin>

  </div> 
</template>

<script>

import chunk from "lodash/chunk";
import API from '../service/api';
import FixedPlugin from "./Layout/Extra/FixedPlugin";
import {
  CardProduct,
  CardNoProduct
} from "@/components";

export default {
  components: {
     CardProduct,
     CardNoProduct,
     FixedPlugin
  },
  mounted(){
            this.menuss()
  },
  data(){
    return{
      loading: true,
      datos: [],
      menus: {},
      page: 0,
    }
  },
        watch:{
        '$store.state.category'() {
          //api/product/search_product/?search_category=
          //console.log(this.$store.state.category)
          this.menuss()
  
        }
    },

  methods:{
    menuss(){
      let categoryId = this.$store.state.category
      if(categoryId == null){
  
        API.get('/api/product/')
        .then( resp => {
          this.datos = resp
          let r = this.datos
          this.menus =chunk(r,8)
          this.loading=false
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
      }else{
          API.get(`/api/product/search_product/?search_category=${categoryId}`)
        .then( resp => {
          this.datos = resp
          let r = this.datos
          this.menus =chunk(r,8)
          this.loading=false
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
      }
      
    },

    notifyVue(verticalAlign, horizontalAlign, date, level) {
      this.$notify({
        message:
           date ,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type:level
      })
    },
    pepe(){
      return this.loading
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
    showButtons(){
      return ((this.datos.length > 8) && ! this.loading);
    },
    emptyProducts(){
      return  ((this.datos.length == 0) && ! this.loading)
    }
  },


    
}
</script>

<style lang="scss"  scoped>
.content{
  margin-top: 3rem ;
}
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
</style>