<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">CEO / Silvina</h6>
      <h4 class="card-title">Gala Estampa</h4>
      <p class="card-description">
        Portacosméticos 14x19 cms. Símil neoprene estampado de ambos lados
        Cierre reforzado
        Personalizalo como elijas
      </p>
      <md-button class="md-round md-primary" id="pepe" v-on:click="back">Volver</md-button>
      <md-button class="md-round md-danger">Comprar</md-button> 
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/Cartuchera.png")
    },

  },
  methods: {
      back(){
          this.$router.push('dashboard')
      }
  },
  data() {
    return {};
  }

};
</script>
<style>
#pepe{
    margin-right: 15%
}
</style>
