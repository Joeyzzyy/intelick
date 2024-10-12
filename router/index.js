import { createRouter, createWebHistory } from 'vue-router';
import ContentGenerationPage from '../components/ContentGenerationPage.vue';
import PageGenerationPage from '../components/PageGenerationPage.vue';
import ContentDetailPage from '../components/ContentDetailPage.vue'
import Home from '../components/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/content-generation', component: ContentGenerationPage },
  { path: '/page-generation', component: PageGenerationPage },
  { path: '/content-detail', component: ContentDetailPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;