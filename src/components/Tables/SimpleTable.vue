<template>
  <div>
    <md-table v-model="products" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="">
          <md-avatar class="md-large">
          <img :src="item.product.stamp" alt="Producto">
      </md-avatar>
        </md-table-cell>
        <md-table-cell md-label="Producto">{{ item.product.name }}</md-table-cell>
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
  data() {
    return {
      selected: [],
      products: []
    };
  },
  mounted(){
    API.get('/api/order/search_order/?client_id=1').then( resp => {
      console.log(resp);
      this.products = resp;
    }).catch( e => alert(e) );
  },
};
</script>
