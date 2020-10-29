<template>

    <md-card>

     <md-avatar class="md-large">
          <img src="@/assets/img/flor.png" alt="Avatar">
        </md-avatar>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button>Action</md-button>
          </div>

          <md-card-expand-trigger style="color: red !important;">
            <md-button>Learn more</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    
   
    
    </md-card>

</template>

<script>
export default {
  data() {
    return {
      fff: false
    }
  },
  methods: {
      f(){
          this.fff = !this.fff
      }
  }
}
</script>

<style lang="scss" scoped>

.card-expansion{

    width: 150rem !important;
}
</style>