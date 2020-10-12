<template>
  <form>
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
    <md-card v-if="!this.loading">
      <md-card-header style="background-color: #ec407a" >
        <h4 class="title">Datos de perfil</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Compania</label>
              <md-input v-model="disabled" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Apodo</label>
              <md-input v-model="facu.first_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="facu.email" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="facu.first_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="facu.last_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Direccion</label>
              <md-input v-model="address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Ciudad</label>
              <md-input v-model="city" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Pais</label>
              <md-input v-model="country" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Codigo Postal</label>
              <md-input v-model="code" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-round  md-gala2">Actualizar Datos</md-button>
          </div>
          <div class="radio">
                <label class="radio-inline">
                  <input id="check-yes" type="radio" v-model="exp" value="true"> Si  
                </label>
                <label class="radio-inline">
                  <input id="check-no" type="radio" v-model="exp" value="false"> No 
                </label>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import API from "../../service/api"
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "danger"
    },
  },
    mounted(){
      this.call()
    },
  data() {
    return {
      person: "",
      username: "" ,
      disabled: "BBVA",
      emailadress: "",
      lastname: "",
      firstname: "",
      address: "",
      city: "",
      country: "",
      code: "",
      exp: "",
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.", 
      respuesta: "",
      facu: "",
      loading: true,
      userid: localStorage.getItem("session"),
    };
  },
    methods:{
      call(){
      console.log(this.userid)
       API.get(`/api/auth/${this.userid}`)
      .then( resp => {
        let  r =resp
         this.facu=r
        this.loading=false 
      })
      .catch( e => this.notifyVue('top', 'right',  e, "danger"));
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
<style>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
</style>
