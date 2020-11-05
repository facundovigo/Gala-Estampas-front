<template>
  <div>
   <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
          <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
      </div>  
    <md-card class="md-card-profile" v-if="!this.loading"> 
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>
      <transition name="bounce">
    <md-card-content v-if="prelogin">
      <h6 class="category text-gray">Gala Estampa</h6>
      <em class="gala-fonts"  v-if="prelogin">
           Tu mejor opcion en regalos personalizados
      </em>
    </md-card-content>
      </transition>        
    <div v-if="prelogin">
    <ValidationObserver v-slot="{ invalid }">  
     <form >
         

        <div class="md-layout-item md-small-size-100">
          <md-list-item>
          <md-icon  style="color: #6BC5C8;">email</md-icon>
          <md-field>
            <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
            <label>Email</label>
            <md-input  type="email"  v-model="login.username" data-cy="username"></md-input>
            <span class="md-gala-s" data-cy="error-pass">{{ errors[0] }}</span>                
            </ValidationProvider>
          </md-field>

        </md-list-item>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-list-item>
            <md-icon  style="color: #6BC5C8;">lock</md-icon>
            <md-field>
              <ValidationProvider name="password" rules="required|mimimo" v-slot="{ errors }">
              <label>Contraseña</label>
              <md-input  type="password" v-model="login.password" data-cy="password"></md-input>
              <span class="md-gala-s" >{{ errors[0] }}</span>
              </ValidationProvider>
            </md-field>
          </md-list-item>
        </div>
      </form>
      <md-card-actions md-alignment="space-between"> 
        <md-button class="md-round md-gala f gala-tam" v-on:click="back">Volver</md-button>
        <md-button class="md-round md-gala-cyan f gala-tam"  v-on:click="loginn" :disabled="invalid" data-cy="login">Ingresar</md-button>
      </md-card-actions>
        <div>
          <h6 class="text-description" v-if="emailIsValid(login.username)">Me olvide
           <em class="gala-fonts-t" style="cursor: pointer;" v-on:click="restorePass">La Contraseña</em>
          </h6>
         <h6 class="text-description" >Sos Nuevo?
          <em class="gala-fonts-t" style="cursor: pointer; " v-on:click="preLogin" data-cy="register">Registrate</em>
          </h6>
         </div>
       </ValidationObserver>  
     </div>

    <div v-else>  
      <ValidationObserver v-slot="{ invalid }">
        <form >
           <md-card >
              <md-card-header style="background-color: #FF5D57;  height: 1rem;" >
                </md-card-header>
                  <md-card-content>
                    <div class="md-layout">
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <ValidationProvider name="firstName" rules="required|mimimo" v-slot="{ errors }">
                          <label>Nombre</label>
                          <md-input  v-model="body.first_name" type="text" data-cy="firstName"></md-input>
                          <span data-cy="error-firstName">{{ errors[0] }}</span>                
                          </ValidationProvider>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-50" required>
                        <md-field>
                            <ValidationProvider name="lastName" rules="required|mimimo" v-slot="{ errors }">
                          <label>Apellido</label>
                          <md-input v-model="body.last_name"  type="text" data-cy="lastName"></md-input>
                          <span data-cy="error-lastName">{{ errors[0] }}</span> 
                            </ValidationProvider>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                          <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
                          <label>Email</label>
                          <md-input  v-model="body.email" type="email" data-cy="email"></md-input>
                          <span data-cy="error-email">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </md-field>
                      </div>
                      
                      <ValidationObserver class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                          <ValidationProvider name="password" rules="required|mimimo|password:@confirm" v-slot="{ errors }">
                          <label>Contraseña</label>
                          <md-input v-model="body.password"  type="password" data-cy="pass"></md-input>
                          <span data-cy="error-pass">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </md-field>
                        <md-field>
                          <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
                          <label>Confirmar contraseña</label>
                          <md-input v-model="body.passConfirm" type="password" data-cy="confirmPass"></md-input>
                          <span data-cy="error-confirmPass">{{ errors[0] }}</span>

                          </ValidationProvider>
                        </md-field>
                     
                      </ValidationObserver>
                    </div>
                  
                  </md-card-content>
                </md-card>
                <md-card-actions md-alignment="space-between">
                    <md-button class="md-round md-gala gala-tam"  v-on:click="preLogin">Volver</md-button>                
                    <md-button class="md-round md-gala-cyan gala-tam" v-on:click="register" :disabled="invalid" data-cy="register">Registrar</md-button>
                </md-card-actions>   
         </form>
      </ValidationObserver>
    </div>
  </md-card>
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
      mimimo: 'Debe ser mayor a 4 letras',
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
      body:{
        first_name:null,
        last_name:null,
        email:null,
        password:null,
        passConfirm:null,
      },
      login:{
        username:null,
        password:null
      },
        prelogin: true,
        loading: false,
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
    back(){
      //this.$router.push('dashboard')
      window.history.go(-1)
    },
    getShippingData(){
      let userid = localStorage.getItem('session')
      API.get(`/api/client/?user_id=${userid}`)
      .then(resp=>{ this.$store.state.client = resp})
      .catch(e => this.notifyVue('top', 'right', "Upss algo salió mal =(", "danger"))
    },
    preLogin(){
        this.prelogin= (!this.prelogin);
    },
      prueba(){
      this.loading=true
      API.post('/api/auth/login/', this.login)
      .then( resp => {
        this.callback(resp)
      })
      .catch(e =>  {
        this.notifyVue('top', 'right', "Usuaro o clave Incorrecto" , "danger")
        this.loading=false}
      )      
    },
    async loginn(){
      const data = await API.post('/api/auth/login/', this.login)
      .then( resp => {
        this.notifyVue('top', 'right', `!!! Que lindo volver a verte ${resp.user.first_name} :)` , "success")
        localStorage.setItem('session', resp.user.id)
        localStorage.setItem('name', resp.user.first_name)
        localStorage.setItem('accessToken', resp.key)
        this.$store.state.auth = true
        this.loading=false
        window.history.go(-1)
      })
      .catch(e =>  {
        this.notifyVue('top', 'right', "Usuaro o clave Incorrecto" , "danger")
        this.loading=false}
      )
      await this.getShippingData()       
    },
    async register(){
      this.loading=true
      await API.post("/api/auth/register/", this.body)
        .then( usr => {
          localStorage.setItem('session', usr.user.id)
          localStorage.setItem('name', usr.user.first_name)
          localStorage.setItem('accessToken', usr.key)
          this.$store.state.auth = true
          //TODO: send mail() 
          this.loading=false
          this.notifyVue('top', 'right', ` ${usr.user.first_name} se registro correctamente  :) `, "success")
          this.$router.push('/')
        })
        .catch(e => {
          this.loading=false 
          this.notifyVue('top', 'right', " :( No se Pudro registrar el usaurio ", "danger")
        })
    },
    async  restorePass(){
      this.loading=true
      var body =  {
        email: this.login.username
      }
      this.$store.state.recoveripass = this.login.username
      await API.post("/api/auth/recover_password/", body)
        .then( usr => {
          this.loading=false
          this.$router.push('restorepass')
        })
        .catch(e => {
          this.loading=false 
          this.notifyVue('top', 'right', " :( Upss algo salio mal", "danger")
        })
    },
    emailIsValid(email) {
      return /\S+@\S+\.\S+/.test(email)
    }
  }
};
</script>

<style lang="css" scoped>
.md-button .md-icon-button .md-dense .md-input-action .md-toggle-password .md-theme-default{
  background-color: red !important;
  color: pink !important;
}
#separacion{
    margin-right: 15%
}
      /*Transition*/
.aparecer-enter{
  opacity: 0;
}
.aparecer-enter-active{
  transition: opacity 0.5s;
}
.aparecer-leave-to{
  opacity: 0;
}
.aparecer-leave-active{
    transition: opacity 0.2s;
}
  /*Animation*/
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
.gala-fonts{
  color:  #6BC5C8;
  font-family: Vegur, 'PT Sans', Verdana, sans-serif;
}

.gala-fonts-t{
  color:#04888d;
  font-family: Vegur, 'PT Sans', Verdana, sans-serif;
}

.text-description{
  font-style: italic ;
}
.md-gala-s{
  font-style: oblique;
  color: rgb(85, 83, 83);
}


</style>