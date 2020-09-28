<template>
  <div class="content">
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
    <div v-if="!this.loading">
     <div  class=" md-layout  md-alignment-top-center" >
          <CardProduct  class=" md-alignment-center" v-for="(product, index) in getMenus()" :key="index" :post=product></CardProduct> 
    </div>

    <div class="md-layout  md-alignment-top-center block" >
      <md-button class="md-raised md-gala md-round " v-on:click="previus">
        <span class="material-icons" >keyboard_arrow_left</span>
      </md-button>
      <md-button class="md-raised md-gala md-round " v-on:click="nextt">
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
      loading: true,
    }
  },
  methods:{
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
    menuss(){
      API.get('/api/product/').then( resp => {
        this.datos = resp 
        let r = this.datos
        
        this.menus = chunk(r,8)
        this.loading = false
      }).catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"),
        this.loading=false);
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

<style lang="scss"  scoped>
.content{
  margin-top: 3rem ;
}
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
</style>