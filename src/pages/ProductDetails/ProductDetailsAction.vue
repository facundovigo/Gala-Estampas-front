<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="this.cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">CEO / Silvina</h6>
      <h4 class="card-title">Gala Estampa</h4>
      <p class="card-description">
        {{this.info}}
      </p>
      <md-button class="md-round md-primary" id="separacion" v-on:click="back">Volver</md-button>
      <md-button class="md-round md-danger" v-on:click="purchase">Comprar</md-button> 
    </md-card-content>
  </md-card>
</template>
<script>
import API from '../../service/api'
export default {
  name: "user-card",
  props: ['data'],
  methods: {
    notifyVue(verticalAlign, horizontalAlign, date, level) {
      this.$notify({
        message:
           date,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: level
      })
    },
    back(){
      this.$router.push('dashboard')
    },
    purchase(){
      if (localStorage.getItem("session")){
      console.log(this.data.id);
      const body={
        product:this.data.id,
        client:getItem("session")
      }
      API.post('/api/order/',body).then( resp =>{
        console.log(resp);
        this.notifyVue('top', 'center', "La compra se realizó con exito. - Fecha de entrega: " + resp.date_order, "success" ) 
        this.$router.push('miscompras');
      }).catch(e => this.notifyVue('top', 'right', " !!No se pudo realizar la compra :( " + e, "danger"))
     }else{
       this.$router.push('user')
     }
    }
  },
  data() {
    return {
      cardUserImage: this.data.category_id.icon,
      info: this.data.info,
    };
  }
};
</script>
<style>
#separacion{
    margin-right: 15%
}
</style>
