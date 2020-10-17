<template>
  <md-card class="md-card-profile" id="prueba">
    <div class="md-card-avatar">
      <img class="img" :src="this.cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="card-title">Realizar pedido</h4>
      <div>
      <label>Precio por unidad: ${{ data.price }}</label>
        <ValidationObserver v-slot="{ invalid }">
          <form>
            <md-field>
              <ValidationProvider name="cant" rules="required|minimo" v-slot="{ errors }">
              <label>Cantidad</label>
              <md-input  v-model="cant" type="number" data-cy="cant"></md-input>
              <span data-cy="cant-error">{{ errors[0] }}</span>                
              </ValidationProvider>
            </md-field>
            <div>
              <label>Fecha de entrega:</label>
              <md-datepicker v-model="shippingDate" />
            </div>
            <div class="input">
              <p class="control">
                <label class="checkbox">
                    <input name="terms" type="checkbox" class="md-gala" v-model="shipping" @change="getShippingData">
                    Envío a domicilio.
                </label>
              </p>
            </div>
            <div v-if="shipping">
              <label>Calcular costo del envío</label>
              <md-field >
                <ValidationProvider name="zipcode" rules="required|zipcode" v-slot="{ errors }">
                  <label>Código Postal: </label>
                  <md-input  v-model="zipCode" type="number" v-on:keyup="getZipAmount()"></md-input>
                  <span >{{ errors[0] }}</span>                
                </ValidationProvider>
              </md-field>
              <label class="md-gala-separation"> Envío: ${{ zipAmount }}</label>
              <label> Total: ${{ data.price * cant + zipAmount }}</label> 
            </div>
            <div>
              <md-button class="md-round md-primary" id="separacion" v-on:click="back">Volver</md-button>
              <md-button class="md-round md-danger" v-on:click="purchase" :disabled="invalid" data-cy="orderCreate">Comprar</md-button> 
            </div>
          </form>
        </ValidationObserver>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import API from '../../service/api';
import { extend, localize } from 'vee-validate';
import format from 'date-fns/format';

localize({
  es: {
    messages: {
      required: 'Este campo es requerido',
      minimo: 'Debe ser mayor a 0',
    }
  }
});

extend('minDate', {
params: ['target'],
   validate(value) {
      return  this.shippingDate.splice(0,4) != "yyyy"
  },
  message: 'pruebaaaaa'
});
extend('zipcode',{
  params: ['target'],
   validate(value) {
      return  value.length > 3
  },
  message: 'El código postal debe tener al menos 4 digitos'
})
extend('minimo', {
params: ['target'],
   validate(value) {
      return value >= 1;
  },
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Las Contraseñas no coinciden'
});
export default {
  name: "user-card",
  props: ['data'],
  dataClient:{},

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
        if(!this.shipping || this.hasShippingData){
          API.post('/api/order/',body)
          .then( resp =>{
            this.notifyVue('top', 'right', "La compra se realizó con exito. - Fecha de entrega: " + resp.date_order, "success" ) 
            this.$router.push('miscompras');
          }).catch(e => {
            this.notifyVue('top', 'right', " !!No se pudo realizar la compra :( " + e.error, "danger")
            console.log(e)
            })
        }else{
          this.$store.state.cardFlap= !this.$store.state.cardFlap
        }
      }else{
        this.$router.push('user')
      }
    },
    getShippingData(){
      this.hasShippingData = this.$store.state.client.length > 0 
    },
    getZipAmount(){
      if(this.zipCode.length > 3){
        API.get(`/api/zip_amount/get_amount_by/?zip_code=${this.zipCode}`)
        .then(resp => {
          this.zipAmount = resp[0].amount
        }).catch(e => this.notifyVue('bottom', 'center', "No hacemos envios a esa ubicación =S", "info"))

      }
    },
  },

  watch:{
    '$store.state.client'() {
        this.hasShippingData = ( this.$store.state.client && this.$store.state.client != [] )
    }
  },

  data() {
    let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
    let now = new Date()
    return {
      cardUserImage: this.data.category_id.icon,
      cant: 1,
      shipping: false,
      zipAmount: 0,
      zipCode: 0,
      shippingDate: format(now, dateFormat),
      hasShippingData: ( this.$store.state.client && this.$store.state.client != [] ),
      userid: localStorage.getItem("session"),
    };
  }
};
</script>
<style>
#separacion{
    margin-right: 15%
}
#prueba{
  margin-top: 8%;
}

.md-gala-separation{
    margin-right: 50%;
}
</style>
