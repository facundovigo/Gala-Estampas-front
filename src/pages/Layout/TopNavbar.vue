<template>
  <md-toolbar md-elevation="0" class="md-transparent">
   <div class="md-toolbar-row">
    <div class="md-collapse f">
    <h3 class="md-title gala-style-text" style="color: #6BC5C8 !important; width: 80% !important;">{{$route.name}}</h3>
    </div>
     <div class="md-collapse" v-if="(this.$route.name == 'Pruductos')">
      <div class="sep" v-for="(category, index) in categoriesA" :key="index">
       <md-button class="md-just-icon md-simple f" v-bind:class="{'gala-category':(!isActive(category.id)), 'gala-category-active':(isActive(category.id))}" 
         v-on:click="searchByCategory(category.id)">
            <md-avatar class="md-avatar-icon" >
              <img :src="category.icon" alt="People">
            </md-avatar>
          <md-tooltip class="gala-style-pop" md-direction="bottom" >{{category.name}}</md-tooltip>
        </md-button>
      </div>
     </div>
    
    <div class="md-toolbar-section-start " >  
     <div class="md-autocomplete md-toolbar-toggle" style="width: 80%;">
            <md-autocomplete
              class="search"
              v-model="selectedProducts"
              @input="search()"
              :md-options="this.categoryListNames"
            >
              <label>Productos...</label>
            </md-autocomplete>
          </div>
      </div>    
        
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle md-gala"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <md-list-item to="/" >
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <md-list-item to="/user" >
              <i class="material-icons" >person</i>
              <p class="hidden-lg hidden-md" >Profile</p>
            </md-list-item>
          </md-list>
        </div>
    </div>
  </md-toolbar>
</template>

<script>
import API from '../../service/api';
import chunk from "lodash/chunk" ;
export default {
  mounted(){
    this.getCategories()
    this.call()

  },
  data() {
    return {
      selectedProducts: null,
      categoryList: [],
      categoryListNames: [],
      categoriesA:[],
      //categoriesB:[],
      isFavorite: false,
    };
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign, date, level, icon, time) {
        this.$notify({
        message:
            date ,
        icon: icon,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type:level,
        timeout: 2500
        })
    },
    getCategories(){
      API.get(`/api/category/`)
      .then(res => {
        const size = res.length
        this.categoriesA =  res 
        

      }).catch(e => this.notifyVue('top', 'right', " :( " + e, "danger", "sentiment_very_dissatisfied", 3000))
    },
    call(){
        API.get('/api/category/')
      .then( resp => {
        this.categoryList = resp
        this.categoryListName(resp)
      })
      .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger", "sentiment_very_dissatisfied", 3000)
      )},
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logOut(){
      localStorage.clear();
      this.$router.push('/');
    },
    search(){
       if(this.categoryListNames.includes(this.selectedProducts) ){
        let res = this.categoryList.filter(e => e.name == this.selectedProducts )
        this.$store.state.category = res[0].id
       }else{
          this.$store.state.category = null
       }
    },
 
    token(){
      return localStorage.getItem("session")
    },
    name(){
      return localStorage.getItem("name")
    },
    categoryListName(resp){
       this.categoryListNames  = resp.map( e => e.name)
    },
    searchByCategory(categoryId){
        if(this.$store.state.category == categoryId){
            this.$store.state.category = null
        }else{
          this.$store.state.category = categoryId
        }
        this.isFavorite = (this.$store.state.category != null) 
    },
    isActive(id){
      return (id==this.$store.state.category)
    }
  }
};
</script>

<style lang="scss" scoped>
.md-list-item-container:not(.md-list-item-default):not([disabled])>.md-list-item-content {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    border-radius: 100%;
}

.md-field .md-input-action {
    top: 8px;
    border-radius: 100% !important;
    background-color: red !important;
    transition: all 0.6s;
}
.sep{
  margin-right: 1rem;
}

.f{
  transition: all 0.6s;
}
.gala-category:hover {
    transition: all .5s;
    transform: scale(1.4); 
 }

.gala-category-active{
  transform: scale(1.4);
     }:focus{
       animation: ripple 400ms linear;
       transition: all 1s; 
     }
.gala-radius{
  border-radius: 100%;
  background-color: pink!important;
}:hover{
    border-radius: 100% !important;
}

@keyframes ripple {
  to {
    transform: scale(1.3);
    opacity: 0;
  }
}

.gala-style-pop{
  font-style: oblique;
  color: #04888d !important;
  font-size: 1rem !important;
}

.gala-style-text{
  font-style: oblique;
  color: #04888d !important;
  font-size: 1.5rem !important;
  margin-right:  15% !important;
}
</style>
