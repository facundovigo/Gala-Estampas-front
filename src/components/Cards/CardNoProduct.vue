<template>

    <md-card>
      <md-card-media-cover md-solid>
        <md-card-media md-ratio="1:1">
          <img :src="this.urlImage" alt="Skyscraper">
        </md-card-media>

        <md-card-area >
            <span class="md-subhead md-layout  md-alignment-top-center" style="color: pink" >No hay resultado para esta busqueda</span>
            <span class="md-subhead md-layout  md-alignment-top-center" style="color: pink">
                      Gala Estampas
                     <i class="fa fa-heart heart"></i> Regalos pensados
                      &copy; {{ new Date().getFullYear() }}
            </span>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
</template>

<script>
export default {
    name:"CardNoProduct",
    data(){
      return{
        urlImage: require("@/assets/img/villains.png")
      }
    },

}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 25rem;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  
//     .md-button i {
//       padding: 0.8rem;
//     color: rgba(0,0,0,0.54) !important;
//   }
//   .md-button i:hover {
        
//         color: red !important;
//             transform: scale(1.4);
//         }:focus{
//           color: red($color: pink);
//         }


</style>

