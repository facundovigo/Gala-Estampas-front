<template>
  <div class="content facu">
    <div class="md-layout" v-if="token()">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>
    </div>

    <div class="md-layout  md-alignment-top-center" v-else>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <login-card> </login-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard, LoginCard } from "@/pages";

export default {
  components: {
    EditProfileForm,
    UserCard,
    LoginCard
  },
  data(){
    return{
    }
  },
  methods:{
    token(){
      return localStorage.getItem("session")
    }
  }
};
</script>

<style lang="scss" scoped>
.facu{

  margin: 1.5rem !important;

}
</style>