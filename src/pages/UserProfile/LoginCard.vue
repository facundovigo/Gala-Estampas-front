<template>
  <md-card class="md-card-profile">
     <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
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

    <form >
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Email</label>
            <md-input  type="email" v-model="login.username"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Contraseña</label>
            <md-input  type="password" v-model="login.password"></md-input>
          </md-field>
        </div>
      </form>
        <md-button class="md-round md-primary" id="separacion" v-on:click="back">Volver</md-button>

         <md-button class="md-round md-success"  v-on:click="loginn">Ingresar</md-button>
         <h6 class="category text-description ">No tenés usuario 
           <a class="page-link color-red"  v-on:click="preLogin">create uno</a>
      </h6>
     </div>

    <div v-else>  
      <form>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Nombre</label>
            <md-input v-model="body.first_name" type="text" ></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Apellido</label>
            <md-input v-model="body.last_name" type="text" ></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Email</label>
            <md-input v-model="body.email" type="email" ></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Contraseña</label>
            <md-input v-model="body.password" type="password" ></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Confirmar contraseña</label>
            <md-input v-model="body.passConfirm" type="password" ></md-input>
          </md-field>
        </div>  
      </form>
          <md-button class="md-round md-primary" id="separacion" v-on:click="preLogin">Volver</md-button>                
          <md-button class="md-round md-success" v-on:click="register">Registrar</md-button>
    </div>
     

  
  </md-card>
</template>

<script>
import API from "../../service/api"
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
        passConfirm:null
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
      this.$router.push('dashboard')
    },
    preLogin(){
        this.prelogin= (!this.prelogin);
    },
      loginn(){
      this.loading=true
      API.post('/api/auth/login/', this.login)
      .then( resp => {
        localStorage.session = resp.user.id
        localStorage.name = resp.user.first_name
        this.notifyVue('top', 'right', `!!! Lindo volver a verte ${resp.user.first_name} :)` , "success")
        this.loading=false
        this.$router.push('dashboard')
        location.reload();

      })
      .catch(e =>  this.notifyVue('top', 'right', "Usuaro o clave Incorrecto" , "danger"),
      this.loading=false)      
    },
    register(){
      this.loading=true
      API.post("/api/auth/register/", this.body)
        .then( resp => {
          localStorage.session = resp.user.id
          localStorage.name = resp.user.first_name
          this.notifyVue('top', 'right', ` el usuario se registro correctamente ${resp.user.first_name} :) `, "success")
          this.loading=false
          this.$router.push('dashboard')
          location.reload();
         })
        .catch(e => this.notifyVue('top', 'right', " :( No se Pudro registrar el usaurio ", "danger"),
        this.loading=false)

      
    }
  }
};
</script>

<style>
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

</style>

<style lang="scss"  scoped>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
</style>