<template>
  <md-card class="md-card-profile" id="prueba">
    <div class="md-card-avatar">
      <img class="img" :src="this.cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="card-title">Realizar pedido</h4>
      <div>
      <label>Precio por unidad: ${{ this.data.price }}</label>
        <ValidationObserver >
          <form>
            <md-field>
              <ValidationProvider name="cant" rules="required|minimo" v-slot="{ errors }">
              <label>Cantidad</label>
              <md-input  v-model="cant" type="number" v-on:change="validate()"></md-input>
              <span >{{ errors[0] }}</span>                
              </ValidationProvider>
            </md-field>
            <div>
                <label>Fecha de entrega:</label>
                <md-datepicker v-model="shippingDate"/>
            </div>
            <div class="input">
              <md-checkbox v-model="shipping">Envío a domicilio</md-checkbox>
            </div>
            <div v-if="shipping">
              <label>Calcular costo del envío</label>
              <md-field >
                <ValidationProvider name="cant" rules="required" v-slot="{ errors }">
                <label>Código Postal: </label>
                <md-input  v-model="zipCode" type="number" v-on:keyup="getZipAmount()"></md-input>
                <span >{{ errors[0] }}</span>                
                </ValidationProvider>
              </md-field>
              <label> Envío: ${{ this.zipAmount }}</label>
            </div>
            <label> Total: ${{ this.data.price * this.cant + this.zipAmount }}</label>
            <div>
              <md-button class="md-round md-primary" id="separacion" v-on:click="back">Volver</md-button>
              <md-button class="md-round md-danger" v-on:click="purchase" :disabled="invalid">Comprar</md-button> 
            </div>
          </form>
        </ValidationObserver>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import API from '../../service/api';
import { extend } from 'vee-validate';
import { localize } from 'vee-validate';
import format from 'date-fns/format';

localize({
  es: {
    messages: {
      required: 'Este campo es requerido',
      minimo: 'Debe ser mayor a 0',
    }
  }
});
extend('minimo', value => {
  return value >= 1;
});
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
      const body={
        product:this.data.id,
        client: localStorage.getItem("session"),
        date_delivery: this.shippingDate,
        cant: this.cant

      }
      if(!this.shipping || this.hasShippimgData()){
        API.post('/api/order/',body).then( resp =>{
          console.log(resp);
          this.notifyVue('top', 'right', "La compra se realizó con exito. - Fecha de entrega: " + resp.date_order, "success" ) 
          this.$router.push('miscompras');
        }).catch(e => this.notifyVue('top', 'right', " !!No se pudo realizar la compra :( " + e, "danger"))
      }else{
        console.log(this.shippingDate);
        this.$router.push('user')
      }
     }else{
       this.$router.push('user')
     }
    },
    validate(){
      this.invalid = ! (this.cant > 0)
    },
    hasShippimgData(){
      return false
    },
    getZipAmount(){
      if(this.zipCode.length > 3){
        API.get(`/api/zip_amount/get_amount_by?zip_code=${this.zipCode}`)
        .then(resp => {
          this.zipAmount = resp[0].amount
        }).catch(e => this.notifyVue('top', 'right', "No hacemos envios a esa ubicación =S", "warning"))

      }
    }
  },

  data() {
    let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
let now = new Date()
    return {
      cardUserImage: this.data.category_id.icon,
      cant: 1,
      shipping: false,
      invalid: false,
      zipAmount: 0,
      zipCode: null,
      shippingDate: format(now, dateFormat),
    };
  }
};
</script>
<style>
#separacion{
    margin-right: 15%
}
#prueba{
  margin-top: 30%;
}

</style>
