<template>
  <div class="content">
    <div class="md-layout" >
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header style="background-color: #6BC5C8!important;">
            <h4 class="md-title ">Mis Favoritos</h4>
            <p class="category">Gala Estampas</p>
          </md-card-header>
          <md-card-content>
            <favorite-table table-header-color="red"></favorite-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { FavoriteTable } from "@/components";

export default {
  components: {
    FavoriteTable
  }
};
</script>

<style lang="scss" scoped>

.md-title{
  color: white !important;
  font-style: italic !important ;
}
.category{
  //color: white !important;
  font-style: italic !important ;
}
</style>
