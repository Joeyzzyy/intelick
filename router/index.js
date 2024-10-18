import { createRouter, createWebHistory } from 'vue-router';
import ContentGenerationPage from '../components/ContentGenerationPage.vue';
import PageGenerationPage from '../components/PageGenerationPage.vue';
import ContentDetailPage from '../components/ContentDetailPage.vue'
import Home from '../components/Home.vue';
import LoginPage from '../components/LoginPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/content-generation', component: ContentGenerationPage, meta: {requiresAuth: true} },
  { path: '/page-generation', component: PageGenerationPage, meta: {requiresAuth: true} },
  { path: '/content-detail', component: ContentDetailPage, meta: {requiresAuth: true} },
  { path: '/login', component: LoginPage },
  { path: '/home', component: Home, meta: {requiresAuth: true} },
  { path: '/:pathMatch(.*)*', redirect: '/'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('intelickIsLoggedIn');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;