<template>
  <a-layout style="height: 100vh; background: #f0f2f5; ">
    <a-layout-content style="height: 100%; padding-bottom: 40px;">
      <a-row gutter="20" style="height: 100%;">
        <!-- Left Section: 1/4 of the width -->
        <a-col :span="8" style="height: 100%; padding: 0 12px 0 0;">
          <div class="left-section" style="height: 100%; overflow: auto; padding: 20px; background: #FFFFFF; border-radius: 15px; min-height: 200px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);">
            <h3>Content Attributes</h3>
            <a-form layout="vertical">
              <a-form-item label="Keywords Setting" label-col="">
                <a-collapse bordered={false} style="background: #fafafa;">
                  <a-collapse-panel v-for="(category, index) in keywordCategories" :key="index" :header="category.name">
                    <a-list bordered>
                      <a-list-item v-for="(keyword, kIndex) in category.keywords" :key="kIndex" style="padding: 10px; border-radius: 8px;">
                        <a-checkbox v-model="keyword.selected" style="color: #5a5a5a">{{ keyword.name }}</a-checkbox>
                        <a-space style="float: right;">
                          <a-button type="link" icon="edit" @click="editKeyword(index, kIndex)" style="color: #1890ff;" />
                          <a-button type="link" icon="delete" @click="deleteKeyword(index, kIndex)" style="color: #ff4d4f;" />
                        </a-space>
                      </a-list-item>
                    </a-list>
                    <a-input v-model:value="keywordCategories[index].newKeyword" placeholder="New Keyword" size="small" style="margin-top: 10px; border-radius: 8px;" />
                    <a-button type="primary" @click="addKeyword(index)" size="small" style="margin-top: 10px; background: #1890ff; border-radius: 8px; border: none;">Add Keyword</a-button>
                  </a-collapse-panel>
                </a-collapse>
              </a-form-item>

              <a-form-item label="Article Type">
                <a-select v-model="form.articleType" size="middle" mode="multiple" style="width: 100%; border-radius: 8px;">
                  <a-select-option v-for="item in articleTypes" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Word Count Range">
                <div style="display: flex; align-items: center; width: 100%;">
                  <a-input-number v-model="form.minWordCount" placeholder="Min" size="middle" style="flex: 1; border-radius: 8px;" />
                  <span style="margin: 0 8px;">to</span>
                  <a-input-number v-model="form.maxWordCount" placeholder="Max" size="middle" style="flex: 1; border-radius: 8px;" />
                </div>
              </a-form-item>
              <a-form-item label="Number of Articles">
                <a-input-number v-model="form.numberOfArticles" size="middle" style="width: 100%; border-radius: 8px;" />
              </a-form-item>
              <a-form-item label="Batch Name">
                <a-input v-model="form.batchName" size="middle" style="border-radius: 8px;" />
              </a-form-item>
              <a-button type="primary" block @click="handleSubmit" style="background: linear-gradient(135deg, #1890ff, #40a9ff); border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">Submit</a-button>
            </a-form>
          </div>
        </a-col>
        <!-- Right Section: 3/4 of the width -->
        <a-col :span="16" style="height: 100%; padding: 0;">
          <div class="right-section" style="height: 100%; overflow: auto; padding: 20px; padding-bottom: 20px; background: #FFFFFF; border-radius: 15px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);">
            <h3>Content Batch List</h3>
            <component :is="currentSubView" />

            <!-- History Table -->
            <a-table :data-source="historyData" bordered style="margin-top: 10px; border-radius: 5px;">
              <a-table-column title="ID" dataIndex="id" key="id"/>
              <a-table-column title="Title" dataIndex="batchName" key="batchName" :width="150"/>
              <a-table-column title="Generate Time" dataIndex="generateTime" key="generateTime" :width="280"/>
              <a-table-column title="Num." dataIndex="numOfArticles" key="numOfArticles" :width="150"/>
              <a-table-column title="Published Num." dataIndex="publishedArticles" key="publishedArticles" :width="150"/>
              <a-table-column title="Operation" key="operation" fixed="right" :width="100">
                <template v-slot="scope">
                  <a-space>
                    <a-button type="link" @click="publishBatch(scope.record.id)" style="color: #52c41a;">Publish</a-button>
                    <a-button type="link" @click="checkBatch(scope.record.id)" style="color: #1890ff;">Check</a-button>
                    <a-button type="link" @click="deleteBatch(scope.record.id)" style="color: red;">Delete</a-button>
                  </a-space>
                </template>
              </a-table-column>
            </a-table>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ContentGenerationPage',
  components: {
  },
  data() {
    return {
      form: {
        keyword: '',
        articleType: '',
        averageWordCount: null,
        numberOfArticles: null,
        batchName: ''
      },
      articleTypes: ['Blog', 'News', 'Review', 'Tutorial'],
      keywordCategories: [
        { name: 'Target Words', keywords: [], newKeyword: '' },
        { name: 'Core Keywords', keywords: [], newKeyword: '' },
        { name: 'Modified Keywords', keywords: [], newKeyword: '' },
        { name: 'Long-tail Keywords', keywords: [], newKeyword: '' }
      ],
      historyData: [
        { id: 1, batchName: 'Batch 1', generateTime: '2024-10-01 10:00', numOfArticles: 5, publishedArticles: 3 },
        { id: 2, batchName: 'Batch 2', generateTime: '2024-10-02 11:00', numOfArticles: 10, publishedArticles: 7 },
        { id: 3, batchName: 'Batch 3', generateTime: '2024-10-03 09:30', numOfArticles: 8, publishedArticles: 5 },
        { id: 4, batchName: 'Batch 4', generateTime: '2024-10-04 12:00', numOfArticles: 6, publishedArticles: 4 },
        { id: 5, batchName: 'Batch 5', generateTime: '2024-10-05 14:20', numOfArticles: 12, publishedArticles: 10 },
        { id: 6, batchName: 'Batch 6', generateTime: '2024-10-06 15:45', numOfArticles: 9, publishedArticles: 6 },
        { id: 7, batchName: 'Batch 7', generateTime: '2024-10-07 08:10', numOfArticles: 7, publishedArticles: 5 },
        { id: 8, batchName: 'Batch 8', generateTime: '2024-10-08 16:30', numOfArticles: 11, publishedArticles: 8 },
        { id: 9, batchName: 'Batch 9', generateTime: '2024-10-09 10:15', numOfArticles: 13, publishedArticles: 11 },
        { id: 10, batchName: 'Batch 10', generateTime: '2024-10-10 09:00', numOfArticles: 14, publishedArticles: 12 },
        { id: 11, batchName: 'Batch 11', generateTime: '2024-10-11 14:00', numOfArticles: 15, publishedArticles: 13 },
        { id: 12, batchName: 'Batch 12', generateTime: '2024-10-12 11:50', numOfArticles: 5, publishedArticles: 4 },
        { id: 13, batchName: 'Batch 13', generateTime: '2024-10-13 13:30', numOfArticles: 8, publishedArticles: 7 },
        { id: 14, batchName: 'Batch 14', generateTime: '2024-10-14 17:00', numOfArticles: 9, publishedArticles: 6 },
        { id: 15, batchName: 'Batch 15', generateTime: '2024-10-15 08:45', numOfArticles: 10, publishedArticles: 9 }
      ],
    };
  },
  methods: {
    addKeyword(categoryIndex) {
      console.log(this.keywordCategories[categoryIndex]);
      if (this.keywordCategories[categoryIndex].newKeyword.trim() !== '') {
        this.keywordCategories[categoryIndex].keywords.push({
          name: this.keywordCategories[categoryIndex].newKeyword.trim(),
          selected: false // 默认未选中
        });
        this.keywordCategories[categoryIndex].newKeyword = '';
      }
    },
    editKeyword(categoryIndex, keywordIndex) {
      const newName = prompt('Edit Keyword', this.keywordCategories[categoryIndex].keywords[keywordIndex].name);
      if (newName !== null && newName.trim() !== '') {
        this.keywordCategories[categoryIndex].keywords[keywordIndex].name = newName.trim();
      }
    },
    deleteKeyword(categoryIndex, keywordIndex) {
      this.keywordCategories[categoryIndex].keywords.splice(keywordIndex, 1);
    },
    publishBatch(id) {
      console.log('Publishing batch with ID:', id);
    },
    checkBatch(id) {
      console.log('Checking batch with ID:', id);
      this.$router.push({ path: '/content-detail', query: { id: id } });
    },
    handleSubmit() {
      const payload = {
        keyword: this.form.keyword,
        articleType: this.form.articleType,
        minWordCount: this.form.minWordCount,
        maxWordCount: this.form.maxWordCount,
        numberOfArticles: this.form.numberOfArticles,
        batchName: this.form.batchName
      };

      axios.post('https://api.example.com/submit', payload)
        .then(response => {
          console.log('Form submitted successfully:', response.data);
          // You can add additional logic here, such as showing a success message or clearing the form
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          // Handle error, such as showing an error message to the user
        });
    }
  }
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  background-color: #f0f2f5;
}

.left-section,
.right-section {
  background-color: #FFFFFF;
  border-radius: 15px;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.a-layout-content {
  height: 100%;
}

.small-input {
  padding: 4px;
  margin-bottom: 8px;
}

.a-button-primary {
  border-radius: 8px;
}

.a-table {
  border-radius: 8px;
}
</style>