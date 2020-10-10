<template>
    <md-card>
      <md-card-media-actions>
        <md-card-media>
          <img :src="this.urlImage" alt="Cover">
        </md-card-media>

        <md-card-actions>

          <md-button class="md-icon-button" v-on:click="makeFavorite">
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
    data(){
      return{
        //imagen: '', //this.post.stamp,
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
      makeFavorite(){
        let body = {
          product: this.post.id,
          client: localStorage.getItem("session")
        }
        API.post('/api/favorite/', body)
        .then( resp => {
         this.notifyVue('top', 'right', ` Gurdaste el producto que te gusto! :) `, "success")
        }).catch(e => this.notifyVue('top', 'right', " :( UuupS Intenta nuevamente ", "danger"))
      }
    }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 20rem;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
    .md-button i {
      padding: 0.8rem;
    color: rgba(0,0,0,0.54) !important;
  }
  .md-button i:hover {
        
        color: red !important;
            transform: scale(1.4);
        }:focus{
          color: red($color: pink);
        }


</style>

