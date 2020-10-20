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
      <p class="card-description" style="color: red" v-if="prelogin">
           tu mejor opcion en regalos personalizados
      </p>
    </md-card-content>
      </transition>        
    <div v-if="prelogin">
    <ValidationObserver v-slot="{ invalid }">  
     <form >
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
            <label>Email</label>
            <md-input  class="md-g" type="email"  v-model="login.username" data-cy="username"></md-input>
            <span data-cy="error-pass">{{ errors[0] }}</span>                
            </ValidationProvider>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <ValidationProvider name="password" rules="required|mimimo" v-slot="{ errors }">
            <label>Contraseña</label>
            <md-input  type="password" v-model="login.password" data-cy="password"></md-input>
            <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </md-field>
        </div>
      </form>
        <md-button class="md-round md-primary" id="separacion" v-on:click="back">Volver</md-button>

         <md-button class="md-round md-gala-cyan"  v-on:click="loginn" :disabled="invalid" data-cy="login">Ingresar</md-button>
         <div >
         <h6 class="category text-description ">No tenés usuario 
           <a class="simple-text"  v-on:click="preLogin" data-cy="register">create uno </a>
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
                <div >
                    <md-button class="md-round md-primary" id="separacion" v-on:click="preLogin">Volver</md-button>                
                    <md-button class="md-round md-gala-cyan" v-on:click="register" :disabled="invalid" data-cy="register">Registrar</md-button>
                </div>      
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
        this.notifyVue('top', 'right', `!!! Lindo volver a verte ${resp.user.first_name} :)` , "success")
        localStorage.session = resp.user.id
        localStorage.name = resp.user.first_name
        this.$store.state.auth = true
        this.loading=false
        //this.$router.push('dashboard')
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
          localStorage.session = usr.user.id
          localStorage.name = usr.user.first_name
          this.$store.state.auth = true
          this.loading=false
          this.notifyVue('top', 'right', ` el usuario se registro correctamente ${usr.user.first_name} :) `, "success")
          this.$router.push('dashboard')
          //window.history.go(-1)
        })
        .catch(e => {
          this.loading=false 
          this.notifyVue('top', 'right', " :( No se Pudro registrar el usaurio ", "danger")
        })
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
</style>