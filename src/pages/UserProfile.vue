<template>
  <div class="content md-gala-content">
    <div class="md-layout" v-if="token()">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div>
    </div>

    <div class="md-layout  md-alignment-top-center" v-else>
      <div class="md-layout-item md-medium-size-100 md-size-40">
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
.md-gala-content{
    margin: 1.5rem !important;
}
.content {
    padding: 30px 15px;
    min-height: calc(100vh - 12.40rem) !important;
  }  
  //0 6 * * *       /usr/bin/php /usr/local/nagiosxi/html/includes/components/scheduledreporting/sendreport.php --report=FLOrIu --username="nagiosadmin" > /dev/null 2>&1
</style>