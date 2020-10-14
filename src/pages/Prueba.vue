<template>

  <div class="md-layout">
      <div v-on:click="toggleCard(cards)">
        <transition name="flip">
          <h1 v-bind:key="cards.flipped" class="card" v-if="!cards.flipped">
              facu
              <!-- <span v-on:click="cards.splice(index, 1)" class="delete-card">X</span> -->
          </h1>
             <p v-bind:key="cards.flipped" class="card" v-else>
                 matis
              <!-- <span v-on:click="cards.splice(index, 1)" class="delete-card">X</span> -->
          </p>
        </transition>
      </div>
     </div>
</template>

<script>
export default {
 el: '#flashcard-app',
  data() {
    return {   
    cards:     {
      flipped: false,
      }
    }
  },  
  methods: {
    toggleCard: function(card) {
      card.flipped = !card.flipped;
    },
  }
}
</script>

<style>

  .card {
    padding: 80px 50px;
    background-color: #51aae5;
    border-radius: 7px;
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
</style>