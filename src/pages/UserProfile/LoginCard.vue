<template>

  <md-card class="md-card-profile">
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
            <md-input  type="email"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Contraseña</label>
            <md-input  type="password"></md-input>
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
            <md-input v-model="body.first_name" type="text" required></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Apellido</label>
            <md-input v-model="body.last_name" type="text" required></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Email</label>
            <md-input v-model="body.email" type="email" required></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Contraseña</label>
            <md-input v-model="body.passwordR" type="password" required></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Confirmar contraseña</label>
            <md-input v-model="body.passConfirm" type="password" required></md-input>
          </md-field>
        </div>  
      </form>
          <md-button class="md-round md-primary" id="separacion" v-on:click="preLogin">Volver</md-button>                
          <md-button class="md-round md-success" v-on:click="register">Registrar</md-button>
    </div>
     

  
  </md-card>
</template>

<script>
import API from '../../service/api'
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
        passwordR:null,
        passConfirm:null
      },
      login:{
        username:null,
        password:null
      },
        prelogin: true,
    };
  },
  methods:{
        notifyVue(verticalAlign, horizontalAlign, date) {
      this.$notify({
        message:
          "La compra se realizó con exito." + date ,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type:"danger"
      })
    },
      back(){
      this.$router.push('dashboard')
    },
    preLogin(){
        this.prelogin= (!this.prelogin);
    },
      loginn(){
      API.post("/api/auth/login/", this.login)
      .then( resp => {
        console.log(resp) 
        localStorage.session = resp.key;
      })
      .catch(e =>  this.notifyVue('top', 'right', e))      
    },
    register(){
      API.post("/api/auth/register/", this.body)
        .then( resp => {
          localStorage.session = resp.key;
         })
        .catch(e => e)
      
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
