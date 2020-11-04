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
        <md-table-cell class="md-subhead" md-label="Producto">{{ item.product_id.name }}</md-table-cell>
        <md-table-cell class="md-subhead" md-label="Precio">{{ item.product_id.price }}</md-table-cell>
        <md-table-cell  md-label="Realizar Pedido">{{ item.date_delivery }}
         <md-button class="md-round md-gala-cyan" v-on:click="details(item.product_id)">Detalles </md-button>
        </md-table-cell>
        <md-table-cell md-label="">
         <md-button class="md-icon-button" v-on:click="deleteItem(item)">
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

  <div class="md-layout  md-alignment-top-center block" v-if="showButtons && (! this.loading)">
    <md-button class="md-raised md-gala md-round " >
      <span class="material-icons derecha" v-on:click="previus()">keyboard_arrow_left</span>
    </md-button>
    <md-button class="md-raised md-gala md-round " >
      <span class="material-icons" v-on:click="nextt()">keyboard_arrow_right</span>
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
      page: 1,
      showButtons: false,
      info:"",
      loading: true,
      client: localStorage.getItem("session"),
    }
  },
  methods:{
      call(){
       API.get(`/api/favorite/search_by_user_id/?client_id=${this.client}`)
      .then( resp => {
        this.products = resp.results
        this.checkShowButtons(resp.count)
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
      this.$router.push({ name: 'Detalles del Producto', params: {post: item}})
    },
    deleteItem(item){
      const product = item.product_id.id
      const client = +localStorage.getItem("session")
      API.delete('/api/favorite/?user_id='+client+'&product_id='+product)
      .then( resp => {
        this.products = this.products.filter(elem => elem.id !== item.id )
      }).catch( e => this.notifyVue('top', 'right', ":( Uuupss algo salio mal", "danger"));
      },
     
    previus(){
      if ( this.page  > 1) {
        this.loading=true
        this.page --
        API.get(`/api/favorite/search_by_user_id/?client_id=${this.client}&page=${this.page}`)
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
       console.log(this.page,"next")
      if(this.info !== null) {
       this.page ++
       this.loading=true
       API.get(`/api/favorite/search_by_user_id/?client_id=${this.client}&page=${this.page}`)
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
