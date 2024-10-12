<template>
  <a-layout style="height: 100vh; background: #f0f2f5;">
    <a-layout-content style="height: 100%; padding: 20px; position: relative;">
      <!-- Back Button -->
      <a-button type="link" @click="$router.push('/')" style="margin-bottom: 20px;">
        ← Back to Content Generation Page
      </a-button>
      
      <!-- Publish Button -->
      <a-button type="primary" style="position: absolute; top: 20px; right: 20px;" @click="publishToStrapi">
        Publish To Strapi
      </a-button>
      
      <!-- Table Section -->
      <a-table :columns="columns" :dataSource="data" rowKey="id" :onRow="onRow" @row-click="onRowClick" row-selection="{ type: 'checkbox' }">
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'operation'">
            <a-button type="link" @click="onRowClick(record)">
              Check
            </a-button>
          </span>
          <span v-if="column.dataIndex === 'status'">
            <a-tag color="green" v-if="record.status === 'Published'">Published</a-tag>
            <a-tag color="yellow" v-else>Unpublished</a-tag>
          </span>
          <span v-else>
            {{ record[column.dataIndex] }}
          </span>
        </template>
      </a-table>
      
      <!-- Drawer Section -->
      <a-drawer :visible="drawerVisible" :title="drawerTitle" @close="drawerVisible = false" :width="600">
        <template #extra>
          <a-button type="primary" @click="saveForm">Save</a-button>
        </template>
        <a-form :model="formData">
          <a-form-item label="Field 1">
            <a-input v-model="formData.field1" />
          </a-form-item>
          <a-form-item label="Field 2">
            <a-input v-model="formData.field2" />
          </a-form-item>
          <a-form-item label="Field 3">
            <a-input v-model="formData.field3" />
          </a-form-item>
          <a-form-item label="Field 4">
            <a-input v-model="formData.field4" />
          </a-form-item>
          <a-form-item label="Field 5">
            <a-input v-model="formData.field5" />
          </a-form-item>
        </a-form>
      </a-drawer>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: false,
      drawerTitle: '',
      formData: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
      },
      data: [
        {
          id: 123,
          title: 'xxxxxx',
          status: 'Published',
          description: 'xxxxxx',
          category: 'xxxxxx',
          content1: 'xxxxxx',
          content2: 'xxxxxx',
          content3: 'xxxxxx',
          content4: 'xxxxxx',
        },
      ],
      columns: [
        {
          title: 'Operation',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: 'Content1',
          dataIndex: 'content1',
          key: 'content1',
        },
        {
          title: 'Content2',
          dataIndex: 'content2',
          key: 'content2',
        },
        {
          title: 'Content3',
          dataIndex: 'content3',
          key: 'content3',
        },
        {
          title: 'Content4',
          dataIndex: 'content4',
          key: 'content4',
        },
      ],
    };
  },
  methods: {
    publishToStrapi() {
      // Implement the logic for publishing to Strapi
      console.log('Publish to Strapi button clicked');
    },
    onRow(record) {
      return {
        onClick: () => this.onRowClick(record),
      };
    },
    onRowClick(record) {
      this.drawerTitle = `Details for ${record.title}`;
      this.formData = {
        field1: record.content1,
        field2: record.content2,
        field3: record.content3,
        field4: record.content4,
        field5: record.description,
      };
      this.drawerVisible = true;
    },
  },
};
</script>

<style scoped>
a-table {
  margin-bottom: 20px;
}
</style>