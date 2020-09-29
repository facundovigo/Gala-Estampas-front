<template>
  <div class="wrapper " :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Inicio</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Mi Perfil</p>
      </sidebar-link>
      <sidebar-link to="/miscompras" v-if="token()">
        <md-icon>content_paste</md-icon>
        <p>Mis Compras</p>
      </sidebar-link>
      <sidebar-link to="/favorites" v-if="token()">
        <md-icon>favorite</md-icon>
        <p>Favoritos</p>
      </sidebar-link>
      <sidebar-link to="/notifications" v-if="token()">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage"></fixed-plugin>

      <dashboard-content></dashboard-content>
  
    <content-footer ></content-footer>
  
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
//import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    //MobileMenu,
    FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "red",
      sidebarBackgroundImage: require("@/assets/img/portada2.jpg")
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
  }
};
</script>

<style lang="scss"  scoped>
/* Ponemos un color de fondo y redondeamos las esquinas del thumb */
.scr::-webkit-scrollbar-thumb {
    background: red  !important;
    border-radius: 4px;
}
/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
.scr::-webkit-scrollbar-thumb:hover {
    background: red !important;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
/* Cambiamos el fondo cuando esté en active */
.scr::-webkit-scrollbar-thumb:active {
    background-color:red !important;
}
</style>



