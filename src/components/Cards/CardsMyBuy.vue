<template>
 <md-card>
      <md-card-media-actions >
        <md-card-media class="p">
              <md-card-media>
              <img :src="img" alt="Producto">
              </md-card-media>
        </md-card-media>
     
        <!-- <md-card-actions>
          <md-button class="md-icon-button md-gala">
            <md-icon>share</md-icon>
          </md-button>

          <md-button class="md-icon-button md-gala">
            <md-icon>shopping_cart</md-icon>
          </md-button>
        </md-card-actions> -->

      </md-card-media-actions>

     <div class="md-subhead text-center">{{ post.product_id.name.toUpperCase() }}</div>
       <md-card-expand>
        <md-card-actions >
          <!-- <div>
            <md-button>Action</md-button>
          </div> -->

          <md-card-expand-trigger>
            <md-button style="color: #6BC5C8 !important;">Detalles</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
           <div class="text-center"> 
          <md-card-header-text>
          <div class="md-subhead">Cantidad: {{ post.cant }}</div>
          <div class="md-subhead">N°Orden: {{ post.id }}</div>
          <div class="md-subhead">Fecha de Entrega: {{ post.date_delivery }}</div>
          <div class="md-subhead">Estado: {{ post.date_delivery }}</div>

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
        img: this.post.product_id.photo
    }
  }
}
</script>

<style lang="scss" scoped>
 .md-card {
    //background-color:antiquewhite!important;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    border: pink 0.5px ridge;
  }
  .md-subhead{
    font-style: oblique;
    font-style: italic ;
    color: black;
}
.p{
  border: pink 0.5px ridge;
}
</style>