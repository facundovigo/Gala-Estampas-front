<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown">
        <i class="fas fa-share-alt icon-trans" @click="toggleDropDown"> </i>
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="header-title"> Gala Estampas</li>
        <li class="header-title d-flex justify-content-center">
          Gracias Por Elegirnos!
        </li>
        <li class="button-container">
          <social-sharing
            :url="shareUrl"
            inline-template
            title="Gala Estampas Lo mejor en regalos personalizados"
            hashtags="Gala Estampas, la mejor Opcion"
            twitter-user="galaestampas"
          >
            <div class="centered-buttons">
              <network
                network="facebook"
                class="md-button md-round md-just-icon md-facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </network>
              <network
                network="twitter"
                class="md-button md-round md-just-icon md-twitter"
              >
                <i class="fab fa-twitter"></i>
              </network>
            </div>
          </social-sharing>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import SocialSharing from "vue-social-sharing";
import VueGitHubButtons from "vue-github-buttons";

Vue.use(SocialSharing);
Vue.use(VueGitHubButtons, { useCache: true });
export default {
  data() {
    return {
      shareUrl: "http://localhost:8080/#/dashboard",
      freeUrl: "http://localhost:8080/#/dashboard",
      isOpen: false,
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    },
    toggleList(list, itemToActivate) {
      list.forEach(listItem => {
        listItem.active = false;
      });
      itemToActivate.active = true;
    },
    updateValue(name, val) {
      this.$emit(`update:${name}`, val);
    },
    changeSidebarBackground(item) {
      this.$emit("update:color", item.color);
      this.toggleList(this.sidebarColors, item);
    },
    changeSidebarImage(item) {
      this.$emit("update:image", item.image);
      this.toggleList(this.sidebarImages, item);
    }
  }
};
</script>
<style>
.fixed-plugin{
  margin-top: -2%;
  padding: 1rem;
  width: 0.5rem !important;
  transition: all .3s;
}
.fixed-plugin:hover{
  width: 5rem !important;
}
.fixed-plugin:hover .icon-trans{
  transform: scale(1.7);
}
.icon-trans{
  transition: all 1s;
}

.centered-row {
  display: flex;
  height: 100%;
  align-items: center;
}

.button-container .btn {
  margin-right: 15px;
}

.centered-buttons {
  display: flex;
  justify-content: center;

}
</style>
