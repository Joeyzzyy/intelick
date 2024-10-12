<template>
  <a-layout style="min-height: 100vh; display: flex; flex-direction: column;">
    <!-- 工具栏 -->
    <div style="padding: 20px; display: flex; align-items: center;">
      <!-- Deploy Pages 按钮 -->
      <a-button type="primary" @click="deployPages">Deploy Pages</a-button>
      <!-- Spacer -->
      <div style="flex: 1;"></div>
      <!-- 搜索框 -->
      <a-input
        v-model="filters.articleName"
        placeholder="Search by Article Name"
        allow-clear
        style="width: 200px; margin-right: 10px;"
      />
      <a-input
        v-model="filters.batchName"
        placeholder="Search by Batch Name"
        allow-clear
        style="width: 200px; margin-right: 10px;"
      />
      <!-- 分类筛选器 -->
      <a-select
        v-model="filters.category"
        placeholder="Filter by Category"
        allowClear
        style="width: 160px; margin-right: 10px;"
        @change="onCategoryChange"
      >
        <a-select-option value="ProductFeatures">Product Features</a-select-option>
        <a-select-option value="IndustryInsights">Industry Insights</a-select-option>
      </a-select>
      <!-- 发布时间范围筛选器 -->
      <a-range-picker
        v-model="filters.publishTimeRange"
        placeholder="Select Publish Date Range"
        style="width: 260px;"
      />
    </div>

    <!-- 当前分类显示 -->
    <div style="padding: 0 20px;">
      <h3>{{ filters.category || 'All Categories' }}</h3>
    </div>

    <!-- 主内容区域 -->
    <div style="flex: 1; padding: 20px 20px 0;">
      <!-- 卡片集合 -->
      <div class="card-row">
        <div
          v-for="(card, index) in paginatedCards"
          :key="card.id"
          class="card-col"
        >
          <a-card :hoverable="true" class="book-card">
            <!-- 卡片内容 -->
            <div class="card-content">
              <!-- 图片部分 -->
              <div class="card-image">
                <img alt="example" :src="card.image" />
              </div>
              <!-- 文本内容 -->
              <div class="card-text">
                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-description">{{ card.description }}</p>
              </div>
            </div>
          </a-card>
        </div>
      </div>
    </div>

    <!-- 分页控件 -->
    <div class="pagination-container">
      <a-pagination
        :current="page"
        :total="filteredCards.length"
        :pageSize="itemsPerPage"
        @change="onPageChange"
        :show-size-changer="false"
      />
    </div>
  </a-layout>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PageGenerationPage',
  data() {
    return {
      page: 1, // 当前页码
      itemsPerPage: 15, // 每页显示的卡片数量
      cards: [], // 卡片数据数组
      filters: {
        category: 'Product Features',
        batchName: '',
        publishTimeRange: [], // 保存两个日期的数组
      },
      categories: ['Product Features', 'Industry Insights'], // 分类列表
    };
  },
  computed: {
    // 根据筛选条件过滤卡片
    filteredCards() {
      let cards = this.cards;

      if (this.filters.category) {
        cards = cards.filter(card => card.category === this.filters.category);
      }

      if (this.filters.batchName) {
        cards = cards.filter(card =>
          card.batchName
            .toLowerCase()
            .includes(this.filters.batchName.toLowerCase())
        );
      }

      if (this.filters.publishTimeRange && this.filters.publishTimeRange.length === 2) {
        const [startDate, endDate] = this.filters.publishTimeRange;
        const start = startDate.startOf('day');
        const end = endDate.endOf('day');
        cards = cards.filter(card => {
          const publishDate = moment(card.publishTime, 'YYYY-MM-DD');
          return publishDate.isBetween(start, end, null, '[]');
        });
      }

      return cards;
    },
    // 获取当前页需要显示的卡片
    paginatedCards() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCards.slice(start, end);
    },
  },
  methods: {
    deployPages() {
      // 实现您的部署页面逻辑
      console.log('Deploy Pages button clicked');
    },
    onPageChange(page) {
      this.page = page;
    },
    onCategoryChange() {
      // 当分类更改时，将页码重置为 1
      this.page = 1;
    },
    // 生成假数据
    generateCards() {
      const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
      for (let i = 1; i <= 50; i++) {
        this.cards.push({
          id: i,
          title: `Card Title ${i}`,
          description: lorem.repeat(Math.floor(Math.random() * 10) + 1),
          image: `https://picsum.photos/300/200?random=${i}`, // 使用横向图片
          batchName: `Batch ${Math.ceil(i / 10)}`,
          publishTime: moment(this.randomDate()).format('YYYY-MM-DD'),
          category: this.categories[Math.floor(Math.random() * this.categories.length)],
        });
      }
    },
    // 生成随机日期
    randomDate() {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30); // 过去 30 天内的日期
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    },
  },
  created() {
    this.generateCards(); // 组件创建时生成假数据
    // 默认选中过去 7 天的日期范围
    const end = moment().endOf('day');
    const start = moment().subtract(7, 'days').startOf('day');
    this.filters.publishTimeRange = [start, end];
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

.book-card {
  width: 100%;
  /* 设置卡片固定高度 */
  height: 300px;
  display: flex;
  flex-direction: column;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  flex: 1;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-text {
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-description {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 显示的行数，可根据需要调整 */
  -webkit-box-orient: vertical;
  white-space: normal;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  margin: -8px; /* 调整卡片之间的间距 */
}

.card-col {
  width: 20%;
  padding: 8px;
  box-sizing: border-box;
}

.pagination-container {
  text-align: center;
  padding: 20px 0;
  /* 去除白色背景 */
  background: none;
  /* 添加美化效果 */
  border-top: 1px solid #e8e8e8;
}

/* 当卡片数量较少时，避免出现滚动条 */
body {
  overflow-y: auto;
}
</style>
