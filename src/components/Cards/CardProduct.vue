<template>
    <md-card>
      <md-card-media-actions>
        <md-card-media>
          <img src="@/assets/img/faces/1.jpg" alt="Cover">
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
    methods:{
        details(){
            this.$router.push('cardDetails')
        }
    }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>

