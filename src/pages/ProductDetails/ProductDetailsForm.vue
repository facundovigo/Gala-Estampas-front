<template>
  <form>
    <md-card id="facu">
        
      <md-card-header :data-background-color="color">
        <h4 class="title">{{name}}</h4>
        <p class="category">{{cabecera}}</p>
      </md-card-header>

      <md-card-content class="prueba">
          <img  :src="data.photo" alt="Cover">
      </md-card-content>    
      
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: ['data'],
  data() {
    return{
        name: this.data.name,
        cabecera: this.data.description,
        color: "red"
    }
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
