<template>
 <md-card>
      <md-card-media-actions>
        <md-card-media>
              <md-card-media>
              <img :src="img" alt="Producto">
              </md-card-media>
        </md-card-media>
     
        <md-card-actions>
          <md-button class="md-icon-button md-gala" v-on:click="details(post.product_id)">
            <md-icon style="color: antiquewhite !important">remove_red_eye</md-icon>
          </md-button>

          <md-button class="md-icon-button md-gala">
            <md-icon style="color: antiquewhite !important">delete</md-icon>
          </md-button>
        </md-card-actions>

      </md-card-media-actions>
      <div class="text-center"> 
        <md-card-header-text>
          <div class="md-subhead">Producto: {{ post.product_id.name }}</div>
          <div class="md-subhead">Precio: {{ post.product_id.price }}</div>
        </md-card-header-text>
      </div>  
    </md-card>
</template>

<script>
export default {
props: ['post'],
data(){
    return{
        img: this.post.product_id.photo
    }
  },
  methods:{
         details(item){
        this.$router.push({ name: 'productDetails', params: {post: item}})
    },
  }
}
</script>

<style lang="scss" scoped>
 .md-card {
    background-color:antiquewhite!important;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    
  }
</style>