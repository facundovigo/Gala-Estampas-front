<template>
      <div class="contenedor">           
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
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
     CardProduct
  },
}
</script>

<style scoped>
.contenedor{

display: row;
/* grid-template-columns: repeat(4);   */
margin-top: 3rem;
margin-left: 1rem;
}

</style>