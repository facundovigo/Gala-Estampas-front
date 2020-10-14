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
              <label>Nombre</label>
              <md-input v-model="user.first_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="user.last_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="user.email" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Celular</label>
              <md-input v-model="telephone" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <label >Cumpleaños:</label>
            <md-datepicker class="gala-birthdate" v-model="birthDate"/>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Direccion</label>
              <md-input v-model="address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Ciudad</label>
              <md-input v-model="city" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Provincia</label>
              <md-input v-model="state" type="text"></md-input>
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
              <md-input v-model="zipCode" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-round  md-gala2" v-on:click="updateUser()">Actualizar Datos</md-button>
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
    created(){
      this.call()
    },
  data() {
    return {
      birthDate: "",
      telephone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      loading: true,
      userid: localStorage.getItem("session"),
    };
  },
    methods:{
      call(){
       API.get(`/api/auth/${this.userid}/`)
          .then( resp => {
            this.user = resp
            this.loading = false 
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
      updateUser(){
        let data = { 
          user: this.user.id,
          telephone: this.telephone,
          birthdate: this.birthDate, 
          address: this.address,
          city: this.city,
          state: this.state,
          country: this.country,
          zip_code: this.zipCode
        }
        API.post(`/api/client/`, data)
        .then(resp =>{
          this.notifyVue('top', 'right', "Se han actualizado los datos correctamente", "success" ) 
          this.$router.push('miscompras');
        }).catch(e => this.notifyVue('top', 'right', "Upss algo salió mal :( ", "danger"))
      }
  }
};
</script>
<style>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
.gala-birthdate{
    margin-top: -16px !important;
    padding-bottom: 0 !important;;
}
</style>
