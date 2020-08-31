<template>
  <!-- <md-card>
      <md-card-media-actions>
        <md-card-media>
          <img src="@/assets/img/faces/1.jpg" alt="Cover">
        </md-card-media>
      </md-card-media-actions>
    </md-card> -->

    <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Edit Profile</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
export default {
name: "CardDetail",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green"
    }
  },
}
</script>

<style>

</style>