<template>
  <a-layout style="height: 100vh;">
    <a-layout-sider
      width="180"
      style="background: #fff; display: flex; flex-direction: column;"
    >
      <!-- 将头像移动到顶部 -->
      <div style="text-align: center; padding: 20px 0;">
        <a-avatar
          :size="64"
          style="cursor: pointer; background-color: #87d068; font-size: 24px;"
          @click="showUserModal"
        >
          {{ userInitials }}
        </a-avatar>
        <a-modal
          v-model:open="isUserModalVisible"
          title="Switch User"
          @ok="switchUser"
          @cancel="hideUserModal"
        >
          <a-select
            v-model:value="selectedUser"
            placeholder="Select a user"
            style="width: 100%;"
          >
            <a-select-option
              v-for="user in users"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }}
            </a-select-option>
          </a-select>
        </a-modal>
      </div>
      <!-- 菜单部分 -->
      <div style="flex: 1; overflow-y: auto;">
        <a-menu
          mode="inline"
          :selectedKeys="[currentView]"
          @click="handleMenuClick"
          style="border: none;"
        >
          <a-menu-item
            v-for="(item, index) in topNavItems"
            :key="item.view"
            :class="{ 'nav-item--active': currentView === item.view }"
          >
            {{ item.title }}
          </a-menu-item>
        </a-menu>
      </div>
      <!-- 登出按钮 -->
      <div style="padding: 20px; text-align: center;">
        <a-button type="default" @click="handleLogout" style="border-radius: 8px;">Logout</a-button>
      </div>
    </a-layout-sider>
    <!-- 内容区域 -->
    <a-layout-content style="padding: 20px; overflow: auto;">
      <component :is="currentView" />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

.ant-layout-content {
  overflow: hidden !important;
}

.nav-item--active {
  background: linear-gradient(135deg, #5e81ac, #81a1c1);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
</style>

<script>
import PageGenerationPage from './PageGenerationPage.vue';
import ContentGenerationPage from './ContentGenerationPage.vue';
import ContentDetailPage from './ContentDetailPage.vue';
import apiClient from '../api/api'; // 使用相对路径引用

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
        { title: 'Generatde Pages', view: 'PageGenerationPage' }
      ],
      currentView: 'ContentGenerationPage',
      isUserModalVisible: false,
      selectedUser: '1', // Default to the first user
      users: [
        { id: '1', name: 'JOGGAI' },
        { id: '2', name: 'HDPIC' },
        { id: '3', name: 'KORREDAIO' }
      ]
    };
  },
  computed: {
    userInitials() {
      const user = this.users.find(user => user.id === this.selectedUser);
      return user ? user.name : 'Pic';
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
      console.log('Switch user method called', this.selectedUser);
      this.isUserModalVisible = false;
    },
    handleLogout() {
      localStorage.removeItem('intelickIsLoggedIn');
      this.$router.push('/');
    },
  }
};
</script>