<template>
  <div class="content" >
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
    <div class="md-layout" v-if="!this.loading">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <ProductDetailsForm :data="this.datos"> </ProductDetailsForm>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <ProductDetailsAction :data="datos"> </ProductDetailsAction>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductDetailsAction, ProductDetailsForm } from "@/pages";
import API from "../service/api";

export default {
  //props:['post'],
  components: {
    ProductDetailsForm,
    ProductDetailsAction
  },
  created(){
    this.call()
  },
  data(){
    return{
        datos: '',
        loading: true,
    }
  },
  methods:{
      call(){
        this.loading = true
        let productId = localStorage.getItem('product')
        API.get(`/api/product/${productId}/`)
        .then( resp => {
          this.datos = resp
          this.loading=false
          console.log(this.datos)
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
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
  }
};
</script>

<style lang="css" scoped>


</style>