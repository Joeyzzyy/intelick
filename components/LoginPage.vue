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
            <a-input v-model:value="form.username" placeholder="Enter your username" size="large" style="border-radius: 8px;" @keydown.enter="handleLogin"/>
          </a-form-item>
          <a-form-item label="Password">
            <a-input-password v-model:value="form.password" placeholder="Enter your password" size="large" style="border-radius: 8px;" @keydown.enter="handleLogin"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block size="large" @click="handleLogin" style="background: linear-gradient(135deg, #1890ff, #40a9ff); border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);" >
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
    if (localStorage.getItem('intelickIsLoggedIn')) {
      this.$router.push('/home');
    }
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      const { username, password } = this.form;
      // Simulate authentication logic
      if (this.form.username && this.form.password) {
        if (this.form.username === 'admin' && this.form.password === 'Admin123') {
          // Simulate successful login
          const fakeAccessToken = 'yourAccessToken123456'; 
          localStorage.setItem('intelickIsLoggedIn', true);
          localStorage.setItem('accessToken', fakeAccessToken);
          this.$router.push('/home');
        } else {
          // Simulate failed login
          this.$notification.error({
            message: 'Login Error',
            description: 'Login failed, wrong username or password'
          });
        }
      } else {
        this.$notification.error({
          message: 'Login Error',
          description: 'Please enter both username and password'
        });
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
