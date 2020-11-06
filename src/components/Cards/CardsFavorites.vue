<template>
 <md-card>
      <md-card-media-actions>
        <md-card-media>
              <md-card-media class="p">
              <img :src="img" alt="Producto">
              </md-card-media>
        </md-card-media>
     
        <md-card-actions>
          <md-button class="md-icon-button md-gala" v-on:click="details(post.product_id)">
            <md-icon style="color: antiquewhite !important">remove_red_eye</md-icon>
          </md-button>

          <md-button class="md-icon-button md-gala" v-on:click="deleteFav(post.product_id)">
            <md-icon style="color: antiquewhite !important">delete</md-icon>
          </md-button>
        </md-card-actions>

      </md-card-media-actions>
      <div class="text-center"> 
        <md-card-header-text>
          <div class="md-subhead" style="color: black !important;">Producto: {{ post.product_id.name }}</div>
          <div class="md-subhead" style="color: black !important;">Precio: {{ post.product_id.price }}</div>
        </md-card-header-text>
      </div>  
    </md-card>
</template>

<script>
import API from '../../service/api'
export default {
props: ['post'],
data(){
    return{
        img: this.post.product_id.photo
    }
  },
  methods:{
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
    details(item){
      this.$router.push({ name: 'CardsFavorites', params: {post: item}})
    },
    deleteFav(item){
      const client = localStorage.getItem("session")
      const product = item.id
      console.log("borro a: ", client, product, item);
      API.delete('/api/favorite/?user_id='+client+'&product_id='+product)
      .then( resp => {
        location.reload()
      }).catch( e => this.notifyVue('top', 'right', ":( Uuupss algo salio mal", "danger", "sentiment_very_dissatisfied", 3000));
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
    font-style: italic ;
}
.p{
  border: pink 0.5px ridge;
}
</style>