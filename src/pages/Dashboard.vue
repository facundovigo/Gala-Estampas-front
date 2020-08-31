<template>
      <div class="container flex-column">           
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>

      </div>
</template>

<script>
import {
  ChartCard,
  CardProduct
 
} from "@/components";

export default {
  components: {
   // ChartCard,
     CardProduct

  },
}
</script>

<style scoped>
.card{
 max-width: 30%;
 max-height: 30%; 
}
</style>