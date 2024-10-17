<template>
  <a-layout style="height: 100vh; background: #f0f2f5;">
    <a-layout-content
      style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 20px;"
    >
      <div
        class="login-container"
        style="width: 400px; padding: 40px; background: #ffffff; border-radius: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);"
      >
        <h2 style="text-align: center; font-weight: bold; margin-bottom: 24px;">Intelick SEO</h2>
        <a-form layout="vertical" @submit.prevent="handleLogin">
          <a-form-item label="Username">
            <a-input v-model="form.username" placeholder="Enter your username" size="large" style="border-radius: 8px;" />
          </a-form-item>
          <a-form-item label="Password">
            <a-input-password v-model="form.password" placeholder="Enter your password" size="large" style="border-radius: 8px;" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block size="large" @click="handleLogin" style="background: linear-gradient(135deg, #1890ff, #40a9ff); border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
              Login
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      // Basic login function for now
      if (this.form.username && this.form.password) {
        console.log('Logging in with:', this.form);
        // Here you could add logic for authentication
      } else {
        this.$message.error('Please enter both username and password');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  font-family: 'Roboto', sans-serif;
}
</style>
