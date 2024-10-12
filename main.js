import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './router'; // 添加对 router 的引入
import 'ant-design-vue/dist/reset.css';

createApp(App)
  .use(Antd)
  .use(router) // 使用 router
  .mount('#app');
