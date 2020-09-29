<template>
  <div class="content" >
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <ProductDetailsForm :data=post> </ProductDetailsForm>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <ProductDetailsAction :data=post> </ProductDetailsAction>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductDetailsAction, ProductDetailsForm } from "@/pages";

export default {
  props:['post'],
  components: {
    ProductDetailsForm,
    ProductDetailsAction
  },
  data(){
    return{
        imagen: this.post.categoria
    }
  }
};
</script>

<style lang="css" scoped>


</style>