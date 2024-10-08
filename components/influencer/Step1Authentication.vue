<template>
  <v-container>
    <v-card class="pa-5 gradient-card" elevation="3">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="8">
          <h1 class="headline font-weight-bold mb-4">Step 1: Authentication</h1>
          <p class="mb-6">在这里您可以授权 Google Sheet 以及发送域名，以确保您的工作流能够顺利地访问和发送数据。</p>
          <v-btn
            color="primary"
            class="google-auth-btn"
            @click="authorizeGoogleSheets"
          >
            授权 Google Sheets
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_Sheets_logo_%282014-2020%29.svg"
            alt="Google Sheets Logo"
            max-width="150"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Step1Authentication',
  methods: {
    authorizeGoogleSheets() {
      // 模拟 Google Sheets 授权的逻辑流程
      console.log('开始 Google Sheets 授权流程...');
      // 假设调用 API 的代码
      setTimeout(() => {
        alert('Google Sheets 授权成功！');
      }, 2000);
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
.google-auth-btn {
  background-color: #5e81ac;
  color: white;
  text-transform: none;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.google-auth-btn:hover {
  background-color: #4c709b;
}
.v-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #eceff4, #ffffff);
}
.headline {
  color: #5e81ac;
}
</style>