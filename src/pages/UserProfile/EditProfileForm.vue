<template>
  <form>
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
    <md-card v-if="!this.loading">
      <md-card-header style="background-color: #ec407a" >
        <h4 class="title"  v-if="(this.$route.name == 'Detalles del Producto')" style="text-align: center !important;"> 
           Ya casi es tuyo completa los datos para el Envío..
          <md-icon class="gala-icon">local_shipping</md-icon>
          </h4>
        <h4 class="title" v-else>Datos de perfil</h4>
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
              <md-input v-model="data.telephone" type="phone"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Codigo Postal</label>
              <md-input v-model="data.zip_code" type="alpha"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Direccion</label>
              <md-input v-model="data.address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Ciudad</label>
              <md-input v-model="data.city" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Provincia</label>
              <md-input v-model="data.state" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-round md-gala2" v-on:click="updateUser()">Actualizar Datos</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import API from "../../service/api";
import { extend, localize } from 'vee-validate';
import format from 'date-fns/format';
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
      data: {
        user: localStorage.getItem("session"),
        telephone: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        birthdate:'1978-11-08',
        country:'arg'
      },
      loading: true,
      user: null,
      client: null,
    };
  },
  
    methods:{
      async call(){
        await API.get(`/api/auth/${this.data.user}/`)
          .then( resp => {
            this.user = resp
            this.loading = false 
          })
          .catch( e => this.notifyVue('top', 'right',  e, "danger"));
        
        await API.get(`/api/client/?user_id=${this.data.user}`)
          .then( resp => { 
              this.$store.state.client = resp
              this.client = resp[0]
            })
          .catch(e => this.notifyVue('top', 'right', "Upss algo salió mal =(", "danger"))
          if(this.client){
            this.data = this.client
          }
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
      
      async updateUser(){
        const notenecesito = await API.post(`/api/client/`, this.data)
          .then(resp =>{
            this.notifyVue('top', 'right', "Se han actualizado los datos correctamente", "success" ) 
            this.$store.state.client = resp
            this.$store.state.cardFlap= !this.$store.state.cardFlap
          })
          .catch(e => this.notifyVue('top', 'right', "Upss algo salió mal :( ", "danger"))
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
.title{
  color: white !important;
  font-style: italic ;
  font-size: 1.5rem !important;
}

.md-gala2{
  font-style: italic !important;
  font-size: 1rem !important;
  
}
.gala-icon{
  margin-left: 1rem !important;
}
</style>
