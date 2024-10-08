import { createRouter, createWebHistory } from 'vue-router';
import WorkflowPage from '../components/WorkflowPage.vue';
import InfluencerPage from '../components/InfluencerPage.vue';
import SEOPage from '../components/SEOPage.vue';
import AIInfraPage from '../components/AIInfraPage.vue';
import KnowledgePage from '../components/KnowledgePage.vue';

const routes = [
  { path: '/', component: WorkflowPage },
  { path: '/influencer', component: InfluencerPage },
  { path: '/seo', component: SEOPage },
  { path: '/ai-infra', component: AIInfraPage },
  { path: '/knowledge', component: KnowledgePage },
  { path: '/overview', component: WorkflowPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;