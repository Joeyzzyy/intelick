<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-container>
          <component :is="currentSubView" />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageGenerationPage',
  components: {
  },
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
.v-container {
  padding: 0px 20px 20px 20px;
}
.v-navigation-drawer {
  transition: transform 0.3s ease;
}
.sub-nav-item {
  cursor: pointer;
}
.sub-nav-item--active {
  font-weight: bold;
  color: #1976d2;
}
</style>