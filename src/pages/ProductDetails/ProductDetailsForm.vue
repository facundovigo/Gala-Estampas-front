<template>
  <form>
    <md-card id="facu">
        
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Cartuchera</h4>
        <p class="category">La mejor opcion para guardar todas tus cosas</p>
      </md-card-header>

      <md-card-content class="prueba">
          <img  src="@/assets/img/faces/1.jpg" alt="Cover">
      </md-card-content>    
      
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "red"
    }
  },
  data() {
  
  }
};
</script>
<style>
.prueba {
    
    width: 55%;
    height: 50%; 
    display:block;
    margin:auto;
}

#facu{
    background-color: rgb(253, 192, 202);
    
}
</style>
