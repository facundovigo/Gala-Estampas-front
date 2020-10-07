<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start " > 
      
      <div class="md-collapse">
               <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Almohadon.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Auto.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Botella.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Camara.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Cartuchera.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Jardin.png" alt="People">
         </md-avatar>
        </md-button>
       </div>

      </div>

     <div class="md-autocomplete md-toolbar-toggle" style="width: 100%;">
            <md-autocomplete
              class="search"
              v-model="selectedProducts"
              @input="prueba()"
              :md-options="this.categoryListNames"
            >
              <label>Productos...</label>
            </md-autocomplete>
          </div>
      </div>    
      <div class="md-toolbar-section-end">

      <div class="md-collapse">
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Mate.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Mochi.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Portacosmeticos.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Tapabocas.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Taza.png" alt="People">
         </md-avatar>
        </md-button>
       </div>
              <div class="sep">
          <md-button class="md-just-icon md-simple" >
           <md-avatar class="md-avatar-icon" >
            <img src="@/assets/img/Mail.png" alt="People">
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
import API from '../../service/api'
export default {
  mounted(){
    this.call()
  },
  data() {
    return {
      selectedProducts: null,
      categoryList: [],
      categoryListNames: []
      
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
    prueba(){
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
    }
  }
};
</script>

<style lang="css" scoped>
.md-field .md-input-action {
    top: 8px;
    border-radius: 50%;
    background-color: red !important;
}
.sep{
  margin-right: 1rem;
}
/* .md-toolbar-section-start{
background-image: url("@/assets/img/Jardin.png") !important;
} */
</style>
