<template>
  <div>
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  

  <div class="md-layout" >
   <md-toolbar class="md-transparent" v-if="!this.loading">
    <div class="md-toolbar-row">
    <md-table v-model="products" :table-header-color="tableHeaderColor" class="md-collapse" >
      
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="">
          <md-avatar class="md-large">
          <img :src="item.product_id.photo" alt="Producto">
      </md-avatar>
        </md-table-cell>
        <md-table-cell md-label="Producto">{{ item.product_id.name }}</md-table-cell>
        <md-table-cell md-label="Precio">{{ item.product_id.price }}</md-table-cell>
        <md-table-cell md-label="Realizar Pedido">{{ item.date_delivery }}
         <md-button class="md-round md-gala-cyan" v-on:click="details(item.product_id)">Detalles </md-button>
        </md-table-cell>
        <md-table-cell md-label="">
         <md-button class="md-icon-button" v-on:click="deleteItem(item.id)">
         <md-icon class="material-icons">delete</md-icon>
         </md-button> 
        </md-table-cell>
      </md-table-row>
    </md-table>
    </div>
    
    <div class="md-toolbar-toggle md-layout  md-alignment-top-center" >
      <CardsFavorites v-for="(product, index) in products" :key="index" :post=product></CardsFavorites>
    </div>

 </md-toolbar>

        <div class="md-layout  md-alignment-top-center block" v-if="showButtons()">
      <md-button class="md-raised md-gala md-round " >
        <span class="material-icons derecha" >keyboard_arrow_left</span>
      </md-button>
      <md-button class="md-raised md-gala md-round " >
        <span class="material-icons" >keyboard_arrow_right</span>
      </md-button>
    </div>
</div>

  </div>
</template>

<script>
import API from '../../service/api';
import {
  CardsFavorites,
} from "@/components";
export default {
  components:{
    CardsFavorites
  },
  name: "favorite-table",
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
      selected: [],
      products: [],
      page: 0,
      loading: true,
      client: localStorage.getItem("session"),
    }
  },
  methods:{
      call(){
       API.get(`/api/favorite/search_by_user_id/?client_id=${this.client}`)
      .then( resp => {
        this.products = resp.results
        this.loading = false
      })
      .catch( e => this.notifyVue('top', 'right',  e, "danger"));
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
    details(item){
        this.$router.push({ name: 'productDetails', params: {post: item}})
    },
    deleteItem(id){
    API.delete(`/api/favorite/${id}`)
    .then(location.reload())
    .catch( e => this.notifyVue('top', 'right', ":( Uuupss algo salio mal", "danger"));
     },
     showButtons(){
      return ((this.products.length > 4) && ! this.loading);
    },
  }
};
</script>

<style lang="scss"  scoped>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}

  .md-button i {
    padding: 1rem;
    color:  gray !important;
    transform: scale(1.5);    
  }

  .md-button i:hover {    
      color: red !important;
      transform: scale(2);

    }:focus{
          color: red($color: pink) ;
        }

</style>
