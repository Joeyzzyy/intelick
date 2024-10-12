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
          <a-select v-model="selectedUserTemp.id" placeholder="Select a user" style="width: 100%;">
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
      selectedUser: 1, // Default to the first user
      selectedUserTemp: { id: 1, name: 'User A' }, // Initialize with the current selected user
      users: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' }
      ]
    };
  },
  computed: {
    userInitials() {
      const user = this.users.find(user => user.id === this.selectedUser);
      return user ? user.name.slice(0, 2).toUpperCase() : 'US';
    }
  },
  methods: {
    handleMenuClick({ key }) {
      this.currentView = key;
    },
    showUserModal() {
      this.isUserModalVisible = true;
      this.selectedUserTemp = { ...this.users.find(user => user.id === this.selectedUser) }; // Set the temporary user to current user
    },
    hideUserModal() {
      this.isUserModalVisible = false;
    },
    switchUser() {
      // Update the selected user based on the modal input
      this.selectedUser = this.selectedUserTemp.id;
      this.isUserModalVisible = false;
      console.log('Switched to user with ID:', this.selectedUser);
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
</style>