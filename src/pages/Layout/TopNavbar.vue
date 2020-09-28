<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start "  v-if="token()">
 
        <h3 class="md-title"  >{{ name()}}</h3>
        
      </div>
   
      
      <div class="md-toolbar-section-end">
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
          <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedProducts"
              @input="prueba"
              :md-options="products"
            >
              <label>Productos...</label>
            </md-autocomplete>
          </div>
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
                <div class="md-list-item-content">
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
export default {
  data() {
    return {
      im: require("@/assets/img/Jardin.png"),
      im2: require("@/assets/img/Tienda.png"),
      selectedProducts: null,
      products: [
        "Taza ceramica",
        "Set de Jardín",
        "Set de Mate",
        "Portacosmeticos",
        "Portacosmeticos con fuelle",
        "Portacosmeticos recto",
        "Cartuchera",
        "Mousepad",
        "Termo autocebante 500ml",
        "Tazas",
        "Jardin",
        "Almohadón",
        "Tapabocas"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logOut(){
      localStorage.clear();
      this.$router.push('/');
    },
    prueba(){
      if(this.products.includes(this.selectedProducts) ){
        // console.log(this.selectedProducts)
        // this.$router.push({query:{...this.$router.query, categorias:this.selectedProducts}})
      }
    },
    token(){
      return localStorage.getItem("session")
    },
    name(){
      return localStorage.getItem("name")
    },
  }
};
</script>

<style lang="css" scoped>
.md-field .md-input-action {
    top: 8px;
    border-radius: 50%;
    background-color: red !important;
}
/* .md-toolbar-section-start{
background-image: url("@/assets/img/Jardin.png") !important;
} */
</style>
