<template>
  <md-card> 
    <md-card-header class="card-chart" :data-background-color="dataBackgroundColor" >
      <img class="imgf" src="@/assets/img/faces/1.jpg" >
    </md-card-header>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>

  
</template>

<script>
export default {
  name: "chart-card",
  props: {
    footerText: {
      type: String,
      default: ""
    },
    headerTitle: {
      type: String,
      default: "Chart title"
    },
    chartResponsiveOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chartId: "no-id"
    };
  },
}
</script>
 
<style  scoped>
.md-card{
  max-width: 70%;
}

</style>