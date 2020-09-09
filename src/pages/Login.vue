<template>
    <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Gala Estampa</h6>
      <h4 class="card-title">Ingresar</h4>
      <p class="card-description">
        Ingresa para personalizar tus productos
      </p>
      <form>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Email</label>
            <md-input v-model="email" type="email"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Contraseña</label>
            <md-input v-model="pass" type="password"></md-input>
          </md-field>
        </div>
      </form>
      <md-button class="md-round md-success" @click="login">Ingresar</md-button>
      <h6 class="category text-description">No tenés usuario 
        <router-link to="register" class="color-red">create uno</router-link>
      </h6>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "login",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/Firma especial.png")
    }
  },
  methods:{
    login(){
      console.log(this.email, this.pass);
    }
  },
  data() {
    return {
      name:null,
      email:null,
      pass:null,
      passConfirm:null
    };
  }
};
</script>
<style>
.color-red{
  color: red !important;
}
</style>