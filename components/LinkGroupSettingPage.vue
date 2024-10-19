<template>
  <div style="overflow: auto;">
    <div class="header">
      <h3>Page Link Setting</h3>
      <a-button type="primary" @click="saveSettings" style="float: right;">Save</a-button>
    </div>
    <div class="link-setting-container">
      <div class="link-setting-section">
        <h3>{{ title }}</h3>
        <a-form layout="vertical" class="add-group-form">
          <a-form-item label="Add New Link Group">
            <a-input
              v-model:value="newGroupName"
              placeholder="Enter Group Name"
              style="width: 60%; margin-right: 10px;"
            />
            <a-button type="primary" @click="addGroup">Add Group</a-button>
          </a-form-item>
        </a-form>
        <a-collapse style="margin-top: 20px;">
          <a-collapse-panel
            v-for="(group, groupIndex) in linkGroups"
            :key="groupIndex"
            :header="group.name"
          >
            <template #extra>
              <a-space>
                <a-button type="link" @click.stop="editGroupName(groupIndex)" style="color: #1890ff;">Edit</a-button>
                <a-button type="link" @click.stop="deleteGroup(groupIndex)" style="color: #ff4d4f;">Delete</a-button>
              </a-space>
            </template>
            <a-list>
              <a-list-item
                v-for="(link, linkIndex) in group.links"
                :key="linkIndex"
                style="padding: 10px; border-radius: 8px;"
              >
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>{{ link.title }} - {{ link.url }}</span>
                  <a-space>
                    <a-button
                      type="link"
                      icon="Edit"
                      @click="editLink(groupIndex, linkIndex)"
                      style="color: #1890ff;"
                    />
                    <a-button
                      type="link"
                      icon="Delete"
                      @click="deleteLink(groupIndex, linkIndex)"
                      style="color: #ff4d4f;"
                    />
                  </a-space>
                </div>
              </a-list-item>
            </a-list>
            <div style="margin-top: 10px;">
              <a-input
                v-model:value="group.newLinkTitle"
                placeholder="Link Title"
                style="width: 30%; margin-right: 10px;"
              />
              <a-input
                v-model:value="group.newLinkUrl"
                placeholder="Link URL"
                style="width: 30%; margin-right: 10px;"
              />
              <a-button type="primary" @click="addLink(groupIndex)">Add Link</a-button>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>

    <div class="link-setting-container">
      <div class="link-setting-section">
        <h3>Footer Links Setting</h3>
        <a-form layout="vertical" class="add-group-form">
          <a-form-item label="Add New Footer Link Group">
            <a-input
              v-model:value="newFooterGroupName"
              placeholder="Enter Footer Group Name"
              style="width: 60%; margin-right: 10px;"
            />
            <a-button type="primary" @click="addFooterGroup">Add Group</a-button>
          </a-form-item>
        </a-form>
        <a-collapse style="margin-top: 20px;">
          <a-collapse-panel
            v-for="(group, groupIndex) in footerLinkGroups"
            :key="groupIndex"
            :header="group.name"
          >
            <template #extra>
              <a-space>
                <a-button type="link" @click.stop="editFooterGroupName(groupIndex)" style="color: #1890ff;">Edit</a-button>
                <a-button type="link" @click.stop="deleteFooterGroup(groupIndex)" style="color: #ff4d4f;">Delete</a-button>
              </a-space>
            </template>
            <a-list>
              <a-list-item
                v-for="(link, linkIndex) in group.links"
                :key="linkIndex"
                style="padding: 10px; border-radius: 8px;"
              >
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>{{ link.title }} - {{ link.url }}</span>
                  <a-space>
                    <a-button
                      type="link"
                      icon="Edit"
                      @click="editFooterLink(groupIndex, linkIndex)"
                      style="color: #1890ff;"
                    />
                    <a-button
                      type="link"
                      icon="Delete"
                      @click="deleteFooterLink(groupIndex, linkIndex)"
                      style="color: #ff4d4f;"
                    />
                  </a-space>
                </div>
              </a-list-item>
            </a-list>
            <div style="margin-top: 10px;">
              <a-input
                v-model:value="group.newLinkTitle"
                placeholder="Link Title"
                style="width: 30%; margin-right: 10px;"
              />
              <a-input
                v-model:value="group.newLinkUrl"
                placeholder="Link URL"
                style="width: 30%; margin-right: 10px;"
              />
              <a-button type="primary" @click="addFooterLink(groupIndex)">Add Link</a-button>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>

    </div>
  </div>
</template>

<script>
import apiClient from '../api/api'; // 使用相对路径引用
export default {
  name: 'HeaderLinksSetting',
  props: {
    title: {
      type: String,
      default: 'Header Links Setting',
    },
  },
  data() {
    return {
      newGroupName: '',
      newFooterGroupName: '',
      linkGroups: [],
      footerLinkGroups: [],
    };
  },
  created() {
    this.fetchLinks();
  },
  methods: {
    addGroup() {
      if (this.newGroupName.trim() !== '') {
        this.linkGroups.push({
          name: this.newGroupName.trim(),
          links: [],
        });
        this.newGroupName = '';
      } else {
        this.$notification.error({
          message: 'Error',
          description: 'Group name cannot be empty',
        });
      }
    },
    addFooterGroup() {
      if (this.newFooterGroupName.trim() !== '') {
        this.footerLinkGroups.push({
          name: this.newFooterGroupName.trim(),
          links: [],
          newLinkTitle: '',
          newLinkUrl: '',
        });
        this.newFooterGroupName = '';
      } else {
        this.$notification.error({
          message: 'Error',
          description: 'Footer group name cannot be empty',
        });
      }
    },
    addLink(groupIndex) {
      const group = this.linkGroups[groupIndex];
      if (group.newLinkTitle.trim() !== '' && group.newLinkUrl.trim() !== '') {
        group.links.push({
          title: group.newLinkTitle.trim(),
          url: group.newLinkUrl.trim(),
        });
        group.newLinkTitle = '';
        group.newLinkUrl = '';
      } else {
        this.$notification.error({
          message: 'Error',
          description: 'Link title and URL cannot be empty',
        });
      }
    },
    addFooterLink(groupIndex) {
      const group = this.footerLinkGroups[groupIndex];
      if (group.newLinkTitle.trim() !== '' && group.newLinkUrl.trim() !== '') {
        group.links.push({
          title: group.newLinkTitle.trim(),
          url: group.newLinkUrl.trim(),
        });
        group.newLinkTitle = '';
        group.newLinkUrl = '';
      } else {
        this.$notification.error({
          message: 'Error',
          description: 'Link title and URL cannot be empty',
        });
      }
    },
    editGroupName(groupIndex) {
      const group = this.linkGroups[groupIndex];
      const newName = prompt('Edit Group Name', group.name);
      if (newName !== null && newName.trim() !== '') {
        group.name = newName.trim();
      }
    },
    editFooterGroupName(groupIndex) {
      const group = this.footerLinkGroups[groupIndex];
      const newName = prompt('Edit Footer Group Name', group.name);
      if (newName !== null && newName.trim() !== '') {
        group.name = newName.trim();
      }
    },
    editLink(groupIndex, linkIndex) {
      const group = this.linkGroups[groupIndex];
      const link = group.links[linkIndex];
      const newTitle = prompt('Edit Link Title', link.title);
      const newUrl = prompt('Edit Link URL', link.url);
      if (newTitle !== null && newTitle.trim() !== '' && newUrl !== null && newUrl.trim() !== '') {
        link.title = newTitle.trim();
        link.url = newUrl.trim();
      }
    },
    editFooterLink(groupIndex, linkIndex) {
      const group = this.footerLinkGroups[groupIndex];
      const link = group.links[linkIndex];
      const newTitle = prompt('Edit Link Title', link.title);
      const newUrl = prompt('Edit Link URL', link.url);
      if (newTitle !== null && newTitle.trim() !== '' && newUrl !== null && newUrl.trim() !== '') {
        link.title = newTitle.trim();
        link.url = newUrl.trim();
      }
    },
    deleteGroup(groupIndex) {
      this.linkGroups.splice(groupIndex, 1);
    },
    deleteFooterGroup(groupIndex) {
      this.footerLinkGroups.splice(groupIndex, 1);
    },
    deleteLink(groupIndex, linkIndex) {
      this.linkGroups[groupIndex].links.splice(linkIndex, 1);
    },
    deleteFooterLink(groupIndex, linkIndex) {
      this.footerLinkGroups[groupIndex].links.splice(linkIndex, 1);
    },
    saveSettings() {
      const payload = {
        headerLinks: this.linkGroups,
        footerLinks: this.footerLinkGroups,
      };
      apiClient.post('/api/save-links', payload)
        .then(response => {
          console.log('Settings saved successfully:', response.data);
          this.$notification.success({
            message: 'Success',
            description: 'Settings have been saved successfully',
          });
        })
        .catch(error => {
          console.error('Error saving settings:', error);
          this.$notification.error({
            message: 'Error',
            description: 'Failed to save settings',
          });
        });
    },
    fetchLinks() {
      apiClient.get('/api/get-links')
        .then(response => {
          this.linkGroups = response.data.headerLinks;
          this.footerLinkGroups = response.data.footerLinks;
        })
        .catch(error => {
          console.error('Error fetching links:', error);
          this.$notification.error({
            message: 'Error',
            description: 'Failed to fetch link settings',
          });
        });
    },
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
}

.link-setting-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.add-group-form {
  margin-bottom: 20px;
}
</style>
