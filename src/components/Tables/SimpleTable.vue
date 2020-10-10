<template>
  <div>  
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div> 

 <div class="md-layout" >
  <md-toolbar class="md-transparent" v-if="!this.loading">
    <div class="md-toolbar-row">
    <md-table v-model="selected" :table-header-color="tableHeaderColor" class="md-collapse" >
      
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
      </md-table-row>
    </md-table>
    </div>
    
    <div class="md-toolbar-toggle md-layout  md-alignment-top-center" >
      <CardsMyBuy v-for="(product, index) in products" :key="index" :post=product></CardsMyBuy>
    </div>
  </md-toolbar>
      <div class="md-layout  md-alignment-top-center block" v-if="showButtons()" >
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
  CardsMyBuy,
} from "@/components";
export default {
  components:{
      CardsMyBuy
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
      selected: {},
      products: [],
      prod: {},
      page: 0,
      loading: true,
      client: localStorage.getItem("session"),
    }
  },
  methods:{
      call(){
       API.get(`/api/order/search_order/?client_id=${this.client}`)
      .then( resp => {
        this.products = resp
        this.prod  = chunk(this.products,5)
        this.getProd()
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
    showButtons(){
      return ((this.products.length > 5) && ! this.loading);
    },
     getProd(){
      this.selected = this.prod[this.page]
    },
    previus(){
      if (this.page !== 0) this.page = this.page -1
    },
    nextt(){
      if (this.page !== this.prod.length -1 ) this.page ++
      getProd()
    },
  }
};
</script>

<style lang="scss"  scoped>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
</style>
