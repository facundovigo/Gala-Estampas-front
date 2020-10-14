<template>
 <div >
  <div v-on:click="toggleCard(cards)">
   <transition name="flip">
      <form v-bind:key="cards.flipped" v-if="!cards.flipped">
        <md-card id="md-color-back">   
          <md-card-header :data-background-color="color">
            <h4 class="title">{{name}}</h4>
            <p class="category">{{cabecera}}</p>
          </md-card-header>

          <md-card-content class="md-gala-container">
              <img  :src="data.photo" alt="Cover">
          </md-card-content>    
        </md-card>
      </form>
       
     <div  v-bind:key="cards.flipped"  v-else>
        <edit-profile-form data-background-color="green" style="margin-top: 7%;"> </edit-profile-form>
     </div> 

   </transition>
  </div>
 </div>  
</template>

<script>
import  EditProfileForm from "../../pages/UserProfile/EditProfileForm";

export default {
  props: ['data'],
  components: {
    EditProfileForm,

  },
  methods: {
    toggleCard: function(card) {
      card.flipped = !card.flipped;
    },
  },
  data() {
    return{
        name: this.data.name,
        cabecera: this.data.description,
        color: "red",
        cards: {
            flipped: false,
          }
    }
  }
};

</script>
<style>
.md-gala-container {
    
    width: 55%;
    height: 50%; 
    display:block;
    margin:auto;
}

#md-color-back{
    background-color: rgb(253, 192, 202);
    margin-top: 7%;
}

.flip-enter-active {
    transition: all 0.9s ease;
  }

.flip-leave-active {
    display: none;
  }

.flip-enter, .flip-leave {
    transform: rotateY(180deg);
    opacity: 0;
  }
.content {
    padding: 30px 15px;
    min-height: calc(100vh - 9.30rem) !important;
  }  
</style>
