<template>
  <div class="wrapper " :class="{ 'nav-open': $sidebar.showSidebar }" style="background-color: #ebf9f9 !important;"> 
    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
      :class="{ toggled: $sidebar.showSidebar }" 
      >
      <div v-on:click="toggleSidebar">
       <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Inicio</p>
       </sidebar-link>
      </div> 
      <div v-on:click="toggleSidebar">
       <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Mi Perfil</p>
       </sidebar-link>
      </div>
      <div v-on:click="toggleSidebar">
        <sidebar-link to="/miscompras" v-if="isAuth">
         <md-icon>content_paste</md-icon>
         <p>Mis Compras</p>
        </sidebar-link>
      </div>
      <div v-on:click="toggleSidebar">
        <sidebar-link to="/favorites" v-if="isAuth">
         <md-icon>favorite</md-icon>
         <p>Favoritos</p>
        </sidebar-link>
      </div>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content></dashboard-content>
      <content-footer ></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
  },
  watch: {
    '$store.state.auth'(){
      this.isAuth = this.token()
    }
  },
  data() {
    return {
      sidebarBackground: "red",
      sidebarBackgroundImage: require("@/assets/img/portada2.jpg"),
      isAuth: this.token()
    };
  },
  methods:{
      token(){
      return localStorage.getItem("session")
    },
     logOut(){
      localStorage.clear();
      this.$router.push('/');
    },
      toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  }
};
</script>

<style >
body::-webkit-scrollbar {
    background-color: white;
  width: 4px;
}
 
body::-webkit-scrollbar-thumb {
  background-color: pink;
  border-radius: 15px;
  /* outline: 1px solid pink;  */
}

.scroller {
  width: 300px;
  height: 100px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}


</style>


