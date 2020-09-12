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
            <md-input v-model="body.username" type="email"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Contraseña</label>
            <md-input v-model="body.password" type="password"></md-input>
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
import API from '../service/api'
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
      API.post("/api/auth/login/", this.body).then( resp => {
        console.log(resp) 
      })     
    }
  },
  data() {
    return {
      body:{
        username:null,
        password:null
      }
    };
  }
};
</script>
<style>
.color-red{
  color: red !important;
}
</style>