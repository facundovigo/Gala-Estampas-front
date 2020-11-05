<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">CEO / Silvina</h6>
      <h4 class="card-title">Gala Estampa</h4>
      <p class="card-description">
        Don't be scared of the truth because we need to restart the human
        foundation in truth And I love you like Kanye loves Kanye I love Rick
        Owens’ bed design but the back is...
      </p>
      <md-button class="md-round md-gala-cyan" id="separacion" v-on:click="back">Volver</md-button>
      <md-button class="md-round md-gala2" v-on:click="logOut">salir</md-button> 
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/Tienda.png")
    },
  },
  methods: {
    logOut(){
      localStorage.clear();
      location.reload();
      this.$router.push('dashboard');
      
    },
    back(){
      this.$router.push('dashboard')
    },
  },
  data() {
    return {
    };
  }
};
</script>
<style>

#separacion{
    margin-right: 15%
}

.md-gala-cyan{
  font-style: italic !important;
  font-size: 1rem !important;
}
</style>
