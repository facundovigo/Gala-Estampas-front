<template>
 <div class="content">  
  <div class="md-layout  md-alignment-top-center spi" style="padding: 10rem"  v-if="this.loading">
     <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
  </div>  
  <div class="md-layout  md-alignment-top-center" v-if="!this.loading">
     <div class="md-layout-item md-medium-size-100 md-size-33">   
       <md-card class="md-card-profile"> 
         <div class="md-card-avatar">
          <img class="img" :src="cardUserImage" />
         </div>

        <md-card-content >

            <em class="gala-fonts" style="color: rgb(85, 83, 83);" >
            Ingresa el Código que te mandamos por correo
            </em>
        </md-card-content>    
    <div >
    <ValidationObserver v-slot="{ invalid }" v-if="!this.loading">  
     <form >
        <div class="md-layout-item md-small-size-100" v-if="!estado" >
          <md-list-item>
          <md-field>
          <ValidationProvider name="Name" rules="required|mimimo" v-slot="{ errors }">
            <label>Confirmar Código</label>
            <md-input  type="password"  v-model="login.code"></md-input>
            <span >{{ errors[0] }}</span>                
            </ValidationProvider>
          </md-field>
        </md-list-item>
        </div>
        <div class="md-layout-item md-small-size-100" v-if="estado">
        <ValidationObserver >
         <md-field>
          <ValidationProvider name="password" rules="required|mimimo|password:@confirm" v-slot="{ errors }">
          <label>Contraseña</label>
          <md-input v-model="body.new_password"  type="password" ></md-input>
          <span >{{ errors[0] }}</span>
            </ValidationProvider>
             </md-field>
           <md-field>
            <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
            <label>Confirmar contraseña</label>
            <md-input v-model="passConfirm" type="password" ></md-input>
            <span >{{ errors[0] }}</span>
            </ValidationProvider>
           </md-field>
        </ValidationObserver>
     </div>
      </form>
        <md-button class="md-round md-gala gala-tam" id="separacion" v-on:click="back">Volver</md-button>
        <md-button class="md-round md-gala-cyan gala-tam"  v-on:click="confirm" :disabled="invalid" v-if="!estado">Confirmar</md-button>
        <md-button class="md-round md-gala-cyan gala-tam"  v-on:click="newpass" :disabled="invalid" v-else>Cambiar</md-button>
         <h6 class="category text-gray">Gala Estampa</h6>
     </ValidationObserver>  
    </div>
       </md-card>
     </div>
   
  </div>
 </div>
</template>

<script>
import API from "../../service/api"
import { extend } from 'vee-validate';
import { localize } from 'vee-validate';
localize({
  es: {
    messages: {
      required: 'Este campo es requerido',
      mimimo: 'Debe ser mayor a 4 numeros',
      email: "Debe ser un correo electrónico válido"
    }
  }
});
extend('mimimo', value => {
  return value.length >= 4;
});
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Las Contraseñas no coinciden'
});
export default {
  name: "login-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/Firma especial1.png")
    },
  },
  data() {
    return {
      login:{
        code:null, 
        email: this.$store.state.recoveripass,
      },
      body:{
        new_password:null,
      },
      passConfirm: null,
      loading: false,
      estado:false
    };
  },
  methods:{
    notifyVue(verticalAlign, horizontalAlign, date, level, icon) {
      this.$notify({
        message:
            date ,
        icon: icon,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type:level,
        timeout: 6000
      })
    },
    async confirm(){
      this.loading=true
       localStorage.clear();
       await API.post("/api/auth/check_code/", this.login)
        .then( usr => {
          console.log(usr, "confirmar");
          localStorage.setItem('accessToken', usr.key)
          this.loading=false
          this.estado= !this.estado
        })
        .catch(e => {
          localStorage.clear();
          this.loading=false 
          this.notifyVue('top', 'right', " :( Upss algo salio mal", "danger", "add_alert")
        })
    },
    async newpass(){
      this.loading=true
      await API.post("/api/auth/set_password/", this.body)
        .then( resp => {
          console.log(resp, "newpass")
          this.notifyVue('top', 'right', `!!! La Contraseña se Cambio Correctamente  :)` , "success", "done")
          localStorage.setItem('session', resp.user.id)
          localStorage.setItem('name', resp.user.first_name)
          localStorage.setItem('accessToken', resp.key)
          this.$store.state.auth = true
          this.loading=false
          this.$router.push('productos')
        })
        .catch(e => {
          this.loading=false 
          localStorage.clear();
          this.notifyVue('top', 'right', " :( Upss algo salio mal", "danger", "add_alert")
        })
    },
    back(){
      window.history.go(-1)
    },

  } 
}

</script>

<style lang="css" scoped>

.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}

.content {
    padding: 30px 15px;
    min-height: calc(100vh - 09.40rem) !important;
  }  

</style>