<template>
 <md-card>
   <h4 class="text-center gala-style-head" >{{ post.product_id.name.toUpperCase() }}</h4>
      <md-card-media-actions >
        <md-card-media class="p">
              <md-card-media>
              <img :src="img" alt="Producto">
              </md-card-media>
        </md-card-media>
      </md-card-media-actions>

       <md-card-expand>
        <md-card-actions >
          <md-card-expand-trigger>
            <md-button id="gala-style-btn">Detalles</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
        <div class="text-center"> 
          <md-card-header-text>
          <div class="md-layout">
          <div class="md-subhead md-layout-item " style="float: left" >N°Orden: {{ post.id }}</div>
          <div class="md-subhead md-layout-item" style="float: left">Cantidad: {{ post.cant }}</div> 
          <div class="md-layout-item ">
            <label class="gala-style" >{{post.date_delivery }}
            <md-icon class="gala-style-icon" style="color: #6BC5C8 !important; float: left;"
            v-if=" post.product_status != 'FN'">local_shipping </md-icon>
           </label>
          </div>
          <div class="md-layout-item ">
           <label class="md-subhead gala-style" >{{getIconByOrderStatusName(post.product_status)}}
            <md-icon class="gala-style-icon" >{{ getIconByOrderStatus(post.product_status) }} </md-icon>
           </label>
          </div> 
          </div>
        </md-card-header-text>
      </div>  
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
</template>

<script>
export default {
props: ['post'],
data(){
    return{
       img: this.post.product_id.photo,
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
  methods: {
    getIconByOrderStatus(orderStatus){
     var icon = this.estado[orderStatus].icon
     return icon
    },
    getIconByOrderStatusName(orderStatus){
      var desc = this.estado[orderStatus].desc
      return desc
    }
  }
}
</script>

<style lang="scss" scoped>
 .md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    border: pink 0.5px ridge;
  }
  .md-subhead{
    font-style: oblique;
    color: black;
}
.p{
  border: pink 0.5px ridge;
}

.gala-style{
  float: right;
}
.gala-style-icon{
  color: #ec407a !important;   
  margin-left: 5px !important; 
  margin-bottom: 5px!important;
}
.gala-style-head{
  margin-top: 1rem !important;
  margin-bottom: -0.5rem !important ;
  font-style: italic !important ;
  color:#ec407a;
}

#gala-style-btn{
  width: 100% !important; 
  font-style: oblique;
  color: #04888d !important;
  font-size: 1rem !important;
}

</style>