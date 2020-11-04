<template>
  <div>  
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div> 

 <div class="md-layout" >
  <md-toolbar class="md-transparent" v-if="!this.loading">
    <div class="md-toolbar-row">
     <md-table v-model="products" :table-header-color="tableHeaderColor" class="md-collapse" >
      
      <md-table-row slot="md-table-row" slot-scope="{ item,  }">
        <md-table-cell md-label="" >
          <md-avatar class="md-large">
           <img :src="item.product_id.photo" alt="Producto">
          </md-avatar>
        </md-table-cell>
        <md-table-cell md-label="Producto">{{ item.product_id.name }}</md-table-cell>
        <md-table-cell md-label="Cantidad">{{ item.cant }}</md-table-cell>
        <md-table-cell md-label="N° Orden">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Fecha de entrega">{{ item.date_delivery }}</md-table-cell>
        <md-table-cell md-label="Estado">
          <md-icon>{{ getIconByOrderStatus(item.product_status) }}</md-icon>
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
      OR: "Pedido",
      AC: "Aceptado",
      PR: "En proceso",
      FN: "Terminado",
      DE: "Entregado",
      RJ: "Rechazado",
      CC: "cancelado",
      products: [],
      page: 1,
      info:"",
      loading: true,
      client: localStorage.getItem("session"),
      showButtons: false,
      estado:{ 
        OR: {desc: "Pedido", icon: "done"},
        AC: {desc: "Aceptado", icon: "done_all"},
        PR: {desc: "En proceso", icon: "En Proceso"},
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
      .catch( e => this.notifyVue('top', 'right',  e, "danger")
      );
      },
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
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
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
        .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
      } 
    },
    checkShowButtons(r){
       this.showButtons = ((r > 5) );
    },
    getIconByOrderStatus(orderStatus){
      var icon = this.estado[orderStatus].icon
      return icon
    }
  }

};
</script>

<style lang="scss"  scoped>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
</style>
