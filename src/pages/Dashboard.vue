<template>
  <div class="content ">
  <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
    <div v-if="!this.loading">
     <div  class=" md-layout  md-alignment-top-center" v-if="!emptyProducts()" >
          <CardProduct  class=" md-alignment-center" v-for="(product, index) in datos" :key="index" :post="product"></CardProduct> 
    </div>
    <div class="md-layout  md-alignment-top-center" v-else>
          <CardNoProduct></CardNoProduct>
    </div>  
    <div class="md-layout  md-alignment-top-center block" v-if="showButtons && (! this.loading)"  >
      <md-button class="md-raised md-gala md-round " v-on:click="this.previus">
        <span class="material-icons" >keyboard_arrow_left</span>
      </md-button>
      <md-button class="md-raised md-gala md-round " v-on:click="this.nextt">
        <span class="material-icons" >keyboard_arrow_right</span>
      </md-button>
    </div>
    </div>
          <fixed-plugin  ></fixed-plugin>
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
  created(){
       this.menuss()
  },
  beforeDestroy(){
    this.$store.state.category = null
  },
  data(){
    return{
      loading: true,
      showButtons: false,
      datos: [],
      info:"",
      page: 1,
    }
  },
  watch:{
      '$store.state.category'() {
      this.menuss()
    }
  },

  methods:{
    menuss(){
      let categoryId = this.$store.state.category
      if(categoryId == null){
        API.get(`/api/product/search_product/?page=${this.page}`)
        .then( resp => {
          this.datos = resp.results
          this.info =  resp.next
          this.checkShowButtons(resp.count)
          this.loading=false
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
      }else{
        this.page=1
        this.loading = true
        API.get(`/api/product/search_product/?search_category=${categoryId}&page=${this.page}`)
        .then( resp => {
          this.datos = resp.results
          this.info =  resp.next
          this.checkShowButtons(resp.count)
          this.loading = false
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
    previus(){
      if ( this.page  > 1) {
        this.loading=true
        this.page --
        API.get(`/api/product/search_product/?page=${this.page}`)
        .then( resp => {
          this.datos = {...resp.results}
          this.info =  resp.next
          this.checkShowButtons(resp.count)
          this.loading=false
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
      }
    },
    nextt(){
      if(this.info !== null) {
       this.page ++
       this.loading=true
       API.get(`/api/product/search_product/?page=${this.page}`)
        .then( resp => {
          this.datos = {...resp.results}
          this.info =  resp.next
          this.checkShowButtons(resp.count)
          this.loading=false
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
      } 
    },
    checkShowButtons(r){
       this.showButtons = ((r > 8) );
    },
    emptyProducts(){
      return  ((this.datos == 0) && ! this.loading)
    },
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

.content {
    padding: 30px 15px;
    min-height: calc(100vh - 12.40rem) !important;
    
  }  
</style>