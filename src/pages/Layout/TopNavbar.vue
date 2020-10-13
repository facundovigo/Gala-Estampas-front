<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start " > 
      
        <div class="md-collapse" v-if="(this.$route.name== 'Dashboard')">
          <div class="sep" v-for="(category, index) in categoriesA" :key="index">
            <md-button class="md-just-icon md-simple " v-bind:class="{'gala-category':(!isActive(category.id)), 'gala-category-active':(isActive(category.id))}" 
            v-on:click="searchByCategory(category.id)">
              <md-avatar class="md-avatar-icon" >
                <img :src="category.icon" alt="People">
              </md-avatar>
            </md-button>
        </div>
      </div>

     <div class="md-autocomplete md-toolbar-toggle" style="width: 100%;">
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
      <div class="md-toolbar-section-end">
      <div class="md-collapse" v-if="(this.$route.name== 'Dashboard')">
        <div class="sep" v-for="(category, index) in categoriesB" :key="index">
          <md-button class="md-just-icon md-simple" v-bind:class="{'gala-category':(!isActive(category.id)), 'gala-category-active':(isActive(category.id))}" v-on:click="searchByCategory(category.id)">
            <md-avatar class="md-avatar-icon" >
              <img :src="category.icon" alt="People">
            </md-avatar>
          </md-button>
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

          <!-- <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedProducts"
              @input="prueba()"
              :md-options="this.categoryListNames"
            >
              <label>Productos...</label>
            </md-autocomplete>
          </div> -->
          <md-list>
            <md-list-item href="#/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <!-- <md-list-item href="#/notifications" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Mike John responded to your email</a></li>
                  <li><a href="#">You have 5 new tasks</a></li>
                  <li><a href="#">You're now friend with Andrew</a></li>
                  <li><a href="#">Another Notification</a></li>
                  <li><a href="#">Another One</a></li>
                </ul>
              </drop-down>
            </md-list-item> -->

            <li class="md-list-item">
              <a
                href="#/notifications"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content" v-if="token()">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <md-list-item href="#/user">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>
          </md-list>
        </div>
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
      categoriesB:[],
      isFavorite: false,
    };
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign, date, level) {
      this.$notify({
        message:
           date ,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type:level
      })
    },
    getCategories(){
      API.get(`/api/category/`)
      .then(res => {
        console.log(res, "categories");
        const size = res.length
        this.categoriesA = chunk(res,6)[0]
        this.categoriesB = chunk(res,6)[1]

      }).catch(e => this.notifyVue('top', 'right', " :( " + e, "danger"))
    },
    call(){
        API.get('/api/category/')
      .then( resp => {
        this.categoryList = resp
        this.categoryListName(resp)
      })
      .catch(e => this.notifyVue('top', 'right', " :( " + e, "danger")
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
        // this.$store.state.category = categoryId
        // this.isFavorite = !this.isFavorite
        // if(!this.isFavorite){
        // this.$store.state.category = null
        // }
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
.md-field .md-input-action {
    top: 8px;
    border-radius: 50%;
    background-color: red !important;
}
.sep{
  margin-right: 1rem;
}
.gala-category:hover {
    transition: all .4s;
    transform: scale(1.4);
  }
/* .md-toolbar-section-start{
background-image: url("@/assets/img/Jardin.png") !important;
} */
.gala-category-active{
  transform: scale(1.4);
}
</style>
