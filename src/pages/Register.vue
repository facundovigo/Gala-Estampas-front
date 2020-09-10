<template>
    <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">Gala Estampa</h6>
      <h4 class="card-title">Registrate</h4>
      <p class="card-description">
        Crea un usuario para personalizar tus productos
      </p>
      <form>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Nombre</label>
            <md-input v-model="name" type="text"></md-input>
          </md-field>
        </div>
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
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Confirmar contraseña</label>
            <md-input v-model="passConfirm" type="password"></md-input>
          </md-field>
        </div>
      </form>
      <md-button class="md-round md-success" @click="register">Registrarme</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "register",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/Firma especial.png")
    }
  },
  methods:{
    register(){
      console.log(this.name, this.email, this.pass, this.passConfirm);
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
<style></style>