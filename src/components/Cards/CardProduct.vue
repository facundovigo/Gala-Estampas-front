<template>
    <md-card>
      <md-card-media-actions>
        <md-card-media>
          <img :src="this.urlImage" alt="Cover">
        </md-card-media>

        <md-card-actions>

          <md-button class="md-icon-button">
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
        details(){
          this.$router.push({ name: 'productDetails', params: {post: this.post}})
        },
        url(){
          return this.t
        }
    }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: auto;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
    .md-button i {
    color: rgba(0,0,0,0.54) !important;
  }
  .md-button i:hover {
           // background-color: red !important;
            color: red !important;
        }:focus{
          color: red($color: pink);
        }

</style>

