<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <ProductDetailsForm> </ProductDetailsForm>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <ProductDetailsAction> </ProductDetailsAction>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductDetailsAction, ProductDetailsForm } from "@/pages";

export default {
  components: {
    ProductDetailsForm,
    ProductDetailsAction
  }
};
</script>

