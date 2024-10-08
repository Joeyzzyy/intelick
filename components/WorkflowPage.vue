<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          @click="currentView = item.view"
          :class="{ 'nav-item': true, 'nav-item--active': currentView === item.view }"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-btn color="primary" @click="logout" class="logout-btn" outlined>
            Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <component :is="currentView" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import InfluencerPage from './InfluencerPage.vue';
import SEOPage from './SEOPage.vue';
import AIInfraPage from './AIInfraPage.vue';
import KnowledgePage from './KnowledgePage.vue';
import OverviewPage from './OverviewPage.vue';

export default {
  name: 'WorkflowPage',
  components: {
    InfluencerPage,
    SEOPage,
    AIInfraPage,
    KnowledgePage,
    OverviewPage,
  },
  data() {
    return {
      currentView: 'OverviewPage',
      navItems: [
        { title: 'Influencer', view: 'InfluencerPage' },
        { title: 'SEO', view: 'SEOPage' },
        { title: 'AI Infra', view: 'AIInfraPage' },
        { title: 'Knowledge', view: 'KnowledgePage' },
        { title: 'Overview', view: 'OverviewPage' },
      ],
      currentView: 'OverviewPage',
    };
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
.nav-item--active {
  background: linear-gradient(135deg, #5e81ac, #81a1c1);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
.nav-item {
  transition: box-shadow 0.3s ease-in-out, background 0.3s;
  padding: 12px;
  border-radius: 8px;
  color: #2e3440;
}
.nav-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #eceff4, #e5e9f0);
  color: #2e3440;
}
.logout-btn {
  background-color: #5e81ac;
  color: white;
  text-transform: none;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.logout-btn:hover {
  background-color: #4c709b;
}
</style>