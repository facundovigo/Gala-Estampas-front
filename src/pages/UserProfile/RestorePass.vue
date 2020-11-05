<template>
  <div class="content">
   <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
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
            Ingresa el Codigo que se te mando al correo
            </em>
        </md-card-content>    
    <div >
    <ValidationObserver v-slot="{ invalid }">  
     <form >
        <div class="md-layout-item md-small-size-100" v-if="!estado">
          <md-list-item>
   
          <md-field>
          <ValidationProvider name="Name" rules="required|mimimo" v-slot="{ errors }">
            <label>Confirmar Codigo</label>
            <md-input  type="password"  v-model="login.code"></md-input>
            <span >{{ errors[0] }}</span>                
            </ValidationProvider>
          </md-field>
        </md-list-item>
        </div>
        <div class="md-layout-item md-small-size-50" v-if="estado">
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
        <md-button class="md-round md-gala" id="separacion" v-on:click="back">Volver</md-button>
        <md-button class="md-round md-gala-cyan"  v-on:click="confirm" :disabled="invalid" v-if="!estado">Confirmar</md-button>
        <md-button class="md-round md-gala-cyan"  v-on:click="newpass" :disabled="invalid" v-else>Cambiar</md-button>
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
    async confirm(){
      this.loading=true
       localStorage.clear();
       await API.post("/api/auth/check_code/", this.login)
        .then( usr => {
          localStorage.setItem('accessToken', usr.key)
          this.loading=false
          this.estado=true
        })
        .catch(e => {
          localStorage.clear();
          this.loading=false 
          this.notifyVue('top', 'right', " :( Upss algo salio mal", "danger")
        })
    },
    async newpass(){
      this.loading=true
      await API.post("/api/auth/set_password/", this.body)
        .then( usr => {
          localStorage.setItem('accessToken', usr.key)
          this.loading=false
          this.$router.push('/')
        })
        .catch(e => {
          this.loading=false 
          localStorage.clear();
          this.notifyVue('top', 'right', " :( Upss algo salio mal", "danger")
        })
    },
    back(){
      //this.$router.push('dashboard')
      window.history.go(-1)
    }, 
  }
};
</script>

<style lang="css" scoped>

.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}

.content {
    padding: 30px 15px;
    min-height: calc(100vh - 12.40rem) !important;
  }  
.content{
  margin-top: 3rem !important;
}

</style>