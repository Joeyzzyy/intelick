<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer app permanent>
          <v-list dense>
            <v-list-item
              v-for="(item, index) in subNavItems"
              :key="index"
              @click="currentSubView = item.view"
              :class="{ 'sub-nav-item': true, 'sub-nav-item--active': currentSubView === item.view }"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="9">
        <v-container>
          <component :is="currentSubView" />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Step1Authentication from './influencer/Step1Authentication.vue';
import Step2MailTemplateManagement from './influencer/Step2MailTemplateManagement.vue';
import Step3Sheets from './influencer/Step3Sheets.vue';
import Step4OutreachTaskManagement from './influencer/Step4OutreachTaskManagement.vue';

export default {
  name: 'InfluencerPage',
  components: {
    Step1Authentication,
    Step2MailTemplateManagement,
    Step3Sheets,
    Step4OutreachTaskManagement,
  },
  data() {
    return {
      subNavItems: [
        { title: 'Step 1: Authentication', view: 'Step1Authentication' },
        { title: 'Step 2: Mail Template Management', view: 'Step2MailTemplateManagement' },
        { title: 'Step 3: Sheets', view: 'Step3Sheets' },
        { title: 'Step 4: Outreach Task Management', view: 'Step4OutreachTaskManagement' },
      ],
      currentSubView: 'Step1Authentication',
    };
  },
};
</script>

<style scoped>
.sub-nav-item--active {
  background: linear-gradient(135deg, #5e81ac, #81a1c1);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
.sub-nav-item {
  transition: box-shadow 0.3s ease-in-out, background 0.3s;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  color: #2e3440;
}
.sub-nav-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #eceff4, #e5e9f0);
  color: #2e3440;
}
</style>