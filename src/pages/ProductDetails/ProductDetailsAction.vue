<template>
  <md-card class="md-card-profile" id="prueba">
    <md-card-media>
      <div class="md-card-avatar">
        <img class="img" :src="this.cardUserImage" />
      </div>
    </md-card-media>  

      <div class="md-title">Realizar pedido</div>
      <p></p>

      <div class="gala-style" style="display:inline;" > 
      <p class="md-subhead p1" >Precio por unidad: ${{ data.price }}<p> 
      <p class="md-subhead p2" style="margin:0;display:inline:float:right">Fecha de Entrega:</p>   
      </div>
 <ValidationObserver v-slot="{ invalid }"> 
  
   <div class="md-layout"> 
    <div class="md-layout-item md-small-size-100 md-size-50">
      <md-field>
        <ValidationProvider name="cant" rules="required|minimo" v-slot="{ errors }">
          <label class="md-subhead" style="color: black !important;">Cantidad</label>
          <md-input  v-model="cant" type="number" data-cy="cant"></md-input>
          <span data-cy="cant-error">{{ errors[0] }}</span>                
        </ValidationProvider>
      </md-field>
    </div>  
     <md-datepicker class="md-layout-item md-small-size-100 md-size-50" v-model="shippingDate"></md-datepicker>
   </div>    

<md-card-content> 
  <div >    
    <md-checkbox v-model="shipping" @change="getShippingData" class="facu" >Envío a domicilio</md-checkbox>
  </div>
</md-card-content>

  <md-card-content> 
   <transition name="fade">
    <div  v-if="shipping">
    
     <md-field style="margin-top: 1rem;" >
       <ValidationProvider name="zipcode" rules="required|zipcode" v-slot="{ errors }">
          <label class="md-subhead" style="color: black !important;">Ingrese el codigo postal para calcular el costo de envio </label>
          <md-input  v-model="zipCode" type="number" v-on:keyup="getZipAmount()"></md-input>
          <span >{{ errors[0] }}</span>                
        </ValidationProvider>
     </md-field>
  
     <div style="margin-top: 2rem;">
     <label class="md-gala-separation gala-label"> Envío: ${{ zipAmount }}</label>
     <label class="gala-label"> Total: ${{ data.price * cant + zipAmount }}</label> 
     </div>
    </div>
   </transition>
  </md-card-content>  



 <p></p>  
 <md-card-actions md-alignment="space-between"> 

   <md-button class="md-round md-gala-cyan gala-tam"  v-on:click="back" :disabled="(compra)">Volver</md-button>
   <transition name="flip">
    <md-button class="md-round md-gala gala-tam" v-on:click="purchase" :disabled="(invalid || compra)" data-cy="orderCreate" 
      v-bind:key="!cards.flipped" v-if="!cards.flipped">Comprar
           <md-progress-spinner :md-diameter="10" :md-stroke="3" md-mode="indeterminate"
       style="margin-left: 2rem; " v-if="compra"></md-progress-spinner>
    </md-button>
    <md-button class="md-round md-gala gala-tam" :disabled="(true)" data-cy="orderCreate" 
      v-bind:key="!cards.flipped" v-if="cards.flipped">Comprar
    </md-button> 

    </transition>
   </md-card-actions>
  </ValidationObserver>       
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
          date_delivery: this.shippingDate,
          cant: this.cant
        }
        this.getShippingData()
        if(!this.shipping || this.hasShippingData){
          this.compra = true
          API.post('/api/order/',body)
          .then( resp =>{
            this.notifyVue('top', 'right', "La compra se realizó con exito. - Fecha de entrega: " + resp.date_order, "success" ) 
            this.$router.push('miscompras');
            this.compra = false
          }).catch(e => {
            this.notifyVue('top', 'right', " !!No se pudo realizar la compra :( " + e.error, "danger")
            this.compra = false
            })
        }else{
          this.$store.state.cardFlap= !this.$store.state.cardFlap
        }
      }else{
        this.$router.push('user')
      }
    },
    getShippingData(){
      this.hasShippingData = (this.$store.state.client != null && this.$store.state.client.length > 0 )
      console.log(this.hasShippingData, "shippingD");
    },
    getZipAmount(){
      if(this.zipCode.length > 3){
        API.get(`/api/zip_amount/get_amount_by/?zip_code=${this.zipCode}`)
        .then(resp => {
          this.zipAmount = resp[0].amount
        }).catch(e => this.notifyVue('bottom', 'center', "No hacemos envios a esa ubicación =S", "info"))

      }
    },
    toggleCard: function(card) {
      card.flipped = !card.flipped;
    },
  },

  watch:{
    '$store.state.client'() {
        this.hasShippingData = ( this.$store.state.client && this.$store.state.client != [] )
    },
     '$store.state.cardFlap'() {
          this.cards.flipped =  !this.cards.flipped
   }
  },
  
  data() {
    let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
    let now = new Date()
    return {
           cards: {
            flipped: false,
      },  
      formState: true,
      cardUserImage: this.data.category_id.icon,
      cant: "",
      shipping: false,
      zipAmount: 0,
      zipCode: '',
      shippingDate: format(now, dateFormat),
      hasShippingData: ( this.$store.state.client && this.$store.state.client != [] ),
      userid: localStorage.getItem("session"),
      compra: false
    };
  }
};
</script>
<style lang="scss" scoped>


.md-title{
  color: pink !important;
  font-style: italic ;
}
.gala-style{
  
  margin-top: 2rem !important ;
}
.gala-label{
  font-style: italic !important;
}
.md-subhead{
    
    font-style: oblique;
}
.p1{
  margin:10;
  display:inline;
  margin-left: 2rem !important;
  float:left;
}
.facu{
  float:left;
}
#separacion{
  margin-left: 4rem ;
  margin-right: 15%
}
#prueba{
  margin-top: 6%;
}

.md-gala-separation{
    margin-right: 50%;
}
.flip-enter-active {
    transition: all 0.9s ease;
  }

.flip-leave-active {
    display: none;
  }

.flip-enter, .flip-leave {
    transform: rotateY(180deg);
    opacity: 0;
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.md-button .md-primary .md-theme-default{
  color: pink !important;
  background-color: pink !important;
}

.gala-tam{
  height: auto;
}

</style>
