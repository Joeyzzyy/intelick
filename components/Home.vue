<template>
  <a-layout style="height: 100vh;">
    <a-layout-sider width="180" style="background: #fff; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <a-menu mode="inline" :selectedKeys="[currentView]" @click="handleMenuClick">
          <a-menu-item v-for="(item, index) in topNavItems" :key="item.view" :class="{ 'nav-item--active': currentView === item.view }">
            {{ item.title }}
          </a-menu-item>
          <a-menu-item v-for="(item, index) in bottomNavItems" :key="item.view" :class="{ 'nav-item--active': currentView === item.view }">
            {{ item.title }}
          </a-menu-item>
        </a-menu>
      </div>
      <div style="padding: 20px; text-align: center;">
        <a-avatar style="cursor: pointer; background-color: #87d068;" @click="showUserModal">
          {{ userInitials }}
        </a-avatar>
        <a-modal v-model:visible="isUserModalVisible" title="Switch User" @ok="switchUser" @cancel="hideUserModal">
          <a-select v-model="selectedUser" placeholder="Select a user" style="width: 100%;">
            <a-select-option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</a-select-option>
          </a-select>
        </a-modal>
      </div>
    </a-layout-sider>
    <a-layout-content style="padding: 20px; height: 100%; overflow: hidden;">
      <component :is="currentView" />
    </a-layout-content>
  </a-layout>
</template>

<script>
import PageGenerationPage from './PageGenerationPage.vue';
import ContentGenerationPage from './ContentGenerationPage.vue';
import ContentDetailPage from './ContentDetailPage.vue';

export default {
  name: 'Home',
  components: {
    PageGenerationPage,
    ContentGenerationPage,
    ContentDetailPage,
  },
  data() {
    return {
      topNavItems: [
        { title: 'Content Generation', view: 'ContentGenerationPage' },
        { title: 'Page Generation', view: 'PageGenerationPage' }
      ],
      currentView: 'ContentGenerationPage',
      isUserModalVisible: false,
      selectedUser: null,
      users: [
        { id: 1, name: 'User A' },
        { id: 2, name: 'User B' },
        { id: 3, name: 'User C' }
      ]
    };
  },
  computed: {
    userInitials() {
      return this.selectedUser ? this.users.find(user => user.id === this.selectedUser).name.slice(0, 2).toUpperCase() : 'US';
    }
  },
  methods: {
    handleMenuClick({ key }) {
      this.currentView = key;
    },
    showUserModal() {
      this.isUserModalVisible = true;
    },
    hideUserModal() {
      this.isUserModalVisible = false;
    },
    switchUser() {
      console.log('Switching to user with ID:', this.selectedUser);
      this.isUserModalVisible = false;
    }
  }
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
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
  min-width: 320px;
}

.nav-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #eceff4, #e5e9f0);
  color: #2e3440;
}
</style>