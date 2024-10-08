<template>
  <v-container>
    <h1 class="headline mb-4">工作流展示</h1>
    <v-row>
      <v-col v-for="(module, index) in workflowModules" :key="index" cols="12" md="4">
        <v-card class="gradient-card" elevation="2">
          <v-card-title>{{ module.name }}</v-card-title>
          <v-card-text>{{ module.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OverviewPage',
  data() {
    return {
      workflowModules: [
        { name: '模块 1', description: '这是模块 1 的描述。' },
        { name: '模块 2', description: '这是模块 2 的描述。' },
        { name: '模块 3', description: '这是模块 3 的描述。' },
        { name: '模块 4', description: '这是模块 4 的描述。' },
        { name: '模块 5', description: '这是模块 5 的描述。' },
      ],
    };
  },
};
</script>

<style scoped>
.headline {
  color: #5e81ac;
}
.gradient-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #eceff4, #ffffff);
}
</style>