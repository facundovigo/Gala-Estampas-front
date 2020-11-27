<template>
  <div>  
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div> 

 <div class="md-layout" >
  <md-toolbar class="md-transparent" v-if="!this.loading">
    <div class="md-toolbar-row">
     <md-table v-model="products" :table-header-color="tableHeaderColor" class="md-collapse" >
      
      <md-table-row slot="md-table-row" slot-scope="{ item,  }"  >
        <md-table-cell md-label="" >
          <md-avatar class="md-large">
           <img :src="item.product_id.photo" alt="Producto">
          </md-avatar>
        </md-table-cell>
        <md-table-cell class="md-subhead" md-label="Producto">{{ item.product_id.name }}</md-table-cell>
        <md-table-cell class="md-subhead" md-label="Cantidad">{{ item.cant }}</md-table-cell>
        <md-table-cell class="md-subhead" md-label="N° Orden">{{ item.id }}</md-table-cell>
        <md-table-cell class="md-subhead" md-label="Fecha de entrega">{{ item.date_delivery }}</md-table-cell>
        <md-table-cell md-label="Estado">
          <md-icon class="gala-style-icon" >{{ getIconByOrderStatus(item.product_status) }}
            <md-tooltip class="gala-style-pop" md-direction="right" >{{getIconByOrderStatusName(item.product_status)}}</md-tooltip>
          </md-icon>
        </md-table-cell>
      </md-table-row> 
    </md-table> 
        
    </div>
    
    <div class="md-toolbar-toggle md-layout  md-alignment-top-center" >
      <CardsMyBuy v-for="(product, index) in products" :key="index" :post=product></CardsMyBuy>
    </div>
  </md-toolbar>
      <div class="md-layout  md-alignment-top-center block" v-if="showButtons && (! this.loading)">
      <md-button class="md-raised md-gala md-round " v-on:click="previus">
        <span class="material-icons derecha" >keyboard_arrow_left</span>
      </md-button>
      <md-button class="md-raised md-gala md-round " v-on:click="nextt">
        <span class="material-icons" >keyboard_arrow_right</span>
      </md-button>
    </div>
</div>
</div>

</template>

<script>
import chunk from "lodash/chunk";
import API from '../../service/api';
import {
  CardsMyBuy,CardPurchases
} from "@/components";

export default {
  components:{
      CardsMyBuy,
    //  CardPurchases
  },
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
    mounted(){
      this.call()

    },
  data() {
    return {
      products: [],
      page: 1,
      info:"",
      loading: true,
      client: localStorage.getItem("session"),
      showButtons: false,
      estado:{ 
        OR: {desc: "Pedido", icon: "done"},
        AC: {desc: "Aceptado", icon: "done_all"},
        PR: {desc: "En proceso", icon: "miscellaneous_services"},
        FN: {desc: "Terminado", icon: "local_shipping"},
        DE: {desc: "Entregado", icon: "stars"},
        RJ: {desc: "Rechazado", icon: "highlight_off"},
        CC: {desc: "cancelado", icon: "highlight_off"}
      }
      
    }
  },
  methods:{
    call(){
      API.get(`/api/order/search_order/?client_id=${this.client}`)
      .then( resp => {
        this.products = resp.results
        this.checkShowButtons(resp.count)
        this.loading = false
      })
      .catch( e => this.notifyVue('top', 'right',  e, "danger","sentiment_very_dissatisfied", 3000)
      );
      },
    notifyVue(verticalAlign, horizontalAlign, date, level, icon, time) {
        this.$notify({
        message:
            date ,
        icon: icon,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type:level,
        timeout: 2500
        })
    },
    previus(){
      if ( this.page  > 1) {
        this.loading=true
        this.page --
       API.get(`/api/order/search_order/?client_id=${this.client}&page=${this.page}`)
        .then( resp => {
          this.products = resp.results
          this.info =  resp.next
          this.checkShowButtons(resp.count)
          this.loading=false
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger", "sentiment_very_dissatisfied", 3000))
      }
    },
    nextt(){
      if(this.info !== null) {
       this.page ++
       this.loading=true
       API.get(`/api/order/search_order/?client_id=${this.client}&page=${this.page}`)
        .then( resp => {
          this.products = resp.results
          this.info =  resp.next
          this.checkShowButtons(resp.count)
          this.loading=false
        })
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger", "sentiment_very_dissatisfied", 3000))
      } 
    },
    checkShowButtons(r){
       this.showButtons = ((r > 5) );
    },
    getIconByOrderStatus(orderStatus){
      var icon = this.estado[orderStatus].icon
      return icon
    },
    getIconByOrderStatusName(orderStatus){
      var desc = this.estado[orderStatus].desc
      return desc
    },
  }

};
</script>

<style lang="scss"  scoped>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
.gala-style{
  font-style: oblique;
  color: #04888d;
  font-size: 1.2rem !important;
  
}

.gala-style-icon{
  color: #ec407a !important;   
  margin-left: 5px !important; 
  margin-bottom: 5px!important;
}

.gala-style-pop{
  font-style: oblique;
  color: #04888d !important;
  font-size: 1.2rem !important;
}
</style>

