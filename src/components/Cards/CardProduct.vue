<template>
    <md-card class="pepe">
      <md-card-media-actions >
        <md-card-media>
          <img :src="this.urlImage"  v-on:click="details" alt="Cover">
        </md-card-media>

        <md-card-actions>

          <md-button v-bind:class="{'md-icon-button':true, 'favorite':(isFavorite)}"
             v-on:click="changeFavorite">
            <md-icon>favorite</md-icon>
          </md-button>

          <md-button class="md-icon-button" v-on:click="details">
            <md-icon>bookmark</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>share</md-icon>
          </md-button>

        </md-card-actions>
      </md-card-media-actions>
    </md-card>
</template>

<script>
import API from '../../service/api';
export default {
    name:"CardProduct",
    props: ['post'],
    mounted(){
      const user = localStorage.getItem("session")
      const productId = this.post.id
      if(user){
        API.get('/api/favorite/verify/?client_id='+user+'&product_id='+productId)
        .then(fav => {
          this.isFavorite = fav.length!=0
        })
        .catch(e => this.notifyVue('top', 'right', " :( UuupS Intenta nuevamente ", "danger"))
      }
    },
    data(){
      return{
        isFavorite: false,
        urlImage: this.post.photo
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
      details(){
        this.$router.push({ name: 'productDetails', params: {post: this.post}})
      },
      url(){
        return this.t
      },
      changeFavorite(){
        let body = {
          product: this.post.id,
          client: localStorage.getItem("session")
        };
        this.isFavorite ? this.quitFavorite(body) : this.makeFavorite(body)
      },
      makeFavorite(body){
        this.isFavorite = !this.isFavorite 
        API.post('/api/favorite/', body)
        .then( resp => {
         this.notifyVue('top', 'right', ` Gurdaste el producto que te gusto! :) `, "success")
        }).catch(e => this.notifyVue('top', 'right', " :( UuupS Intenta nuevamente ", "danger"))
      },
      quitFavorite(body){
        console.log(body, "borro a ");
        this.isFavorite = !this.isFavorite 
        API.delete('/api/favorite/?user_id='+body.client+'&product_id='+body.product)
        .then( resp => {
         this.notifyVue('top', 'right', `Ya volveremos a conquistar tu corazón con otro producto ;) `, "success")
        }).catch(e => this.notifyVue('top', 'right', " :( UuupS Intenta nuevamente ", "danger"))
      }
    }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 20rem;
    margin: 8px;
    display: inline-block;
    vertical-align: top;
  }
  .md-button i {
      padding: 0.8rem;
      color: rgba(0,0,0,0.54) !important;
      
  }
  .md-icon-button.favorite{
    color: red !important;
    transform: scale(1.4);
  }
  .md-button i:hover {
        color: red !important;
        transform: scale(1.4);
        }:focus{
          color: red($color: pink);
        }
  .pepe:hover {
    transition: all .4s;
    transform: scale(1.1);
  }:focus{
    color: red($color: pink);
        }
  
</style>

