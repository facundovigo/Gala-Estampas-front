<template>
  <div>
    <div class="md-layout  md-alignment-top-center spi" v-if="this.loading" style="padding: 10rem">
        <md-progress-spinner :md-diameter="150" :md-stroke="15" md-mode="indeterminate" ></md-progress-spinner>
    </div>  
    <md-table v-model="products" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="">
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
</template>

<script>
import API from '../../service/api';
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
    mounted(){
      API.get('/api/order/search_order/?client_id=1')
      .then( resp => {
        this.products = resp
        this.loading = false
      })
      .catch( e => this.notifyVue('top', 'right',  e, "danger")
      );
    },
  data() {
    return {
      selected: [],
      products: [],
      page: 0,
      loading: true,
    }
  },
  methods:{
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
  }
};
</script>

<style lang="scss"  scoped>
.spi{
  color: pink !important;
  --md-theme-default-primary: #f06292 !important;
}
</style>
