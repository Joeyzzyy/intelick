<template>
  <a-layout style="padding: 20px;">
    <!-- Current Category Display -->
    <div style="margin-bottom: 20px;">
      <h2>{{ filters.category || 'All Categories' }}</h2>
    </div>

    <!-- Toolbar -->
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <!-- Deploy Pages Button -->
      <a-button type="primary" @click="deployPages">Deploy Pages</a-button>
      <!-- Spacer -->
      <div style="flex: 1;"></div>
      <!-- Search Box -->
      <a-input
        v-model="filters.batchName"
        placeholder="Search by Batch Name"
        allow-clear
        style="width: 180px; margin-right: 10px;"
      />
      <!-- Category Filter -->
      <a-select
        v-model="filters.category"
        placeholder="Filter by Category"
        allowClear
        style="width: 180px; margin-right: 10px;"
        @change="onCategoryChange"
      >
        <a-select-option value="Product Features">Product Features</a-select-option>
        <a-select-option value="Industry Insights">Industry Insights</a-select-option>
      </a-select>
      <!-- Publish Time Range Picker -->
      <a-range-picker
        v-model="filters.publishTimeRange"
        placeholder="Select Publish Date Range"
        style="width: 300px; margin-right: 10px;"
      />
    </div>

    <!-- Card Collection -->
    <a-row :gutter="[16, 16]" class="card-row">
      <a-col
        v-for="(card, index) in paginatedCards"
        :key="card.id"
        class="card-col"
      >
        <a-card :hoverable="true" class="book-card">
          <!-- Card Content -->
          <div class="card-content">
            <!-- Image Part -->
            <div class="card-image">
              <img alt="example" :src="card.image" />
            </div>
            <!-- Text Content -->
            <div class="card-text">
              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-description">{{ card.description }}</p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Pagination -->
    <div style="text-align: center; margin-top: 20px;">
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
      page: 1, // Current page number
      itemsPerPage: 36, // Number of cards per page
      cards: [], // Card data array
      filters: {
        category: 'Product Features',
        batchName: '',
        publishTimeRange: [], // Array holding two dates
      },
      categories: ['Product Features', 'Industry Insights'], // Category list
    };
  },
  computed: {
    // Filter cards based on selected filters
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
    // Get cards for the current page
    paginatedCards() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCards.slice(start, end);
    },
  },
  methods: {
    deployPages() {
      // Implement your deploy pages logic here
      console.log('Deploy Pages button clicked');
    },
    onPageChange(page) {
      this.page = page;
    },
    onCategoryChange() {
      // Reset page number to 1 when category changes
      this.page = 1;
    },
    // Generate mock data
    generateCards() {
      const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
      for (let i = 1; i <= 40; i++) {
        this.cards.push({
          id: i,
          title: `Card Title ${i}`,
          description: lorem.repeat(Math.floor(Math.random() * 10) + 1), // Increased the max repeats
          image: `https://picsum.photos/300/200?random=${i}`, // Use horizontal images
          batchName: `Batch ${Math.ceil(i / 10)}`,
          publishTime: moment(this.randomDate()).format('YYYY-MM-DD'),
          category: this.categories[Math.floor(Math.random() * this.categories.length)],
        });
      }
    },
    // Generate random date
    randomDate() {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30); // Dates within the past 30 days
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    },
  },
  created() {
    this.generateCards(); // Generate mock data when component is created

    // Default to past 7 days
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
  /* Set fixed card height */
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
  -webkit-line-clamp: 4; /* Adjusted number of lines */
  -webkit-box-orient: vertical;
  white-space: normal;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
}

.card-col {
  flex: 0 0 20%; /* 100% / 5 = 20% */
  max-width: 20%;
}

@media (max-width: 1200px) {
  .card-col {
    flex: 0 0 25%; /* Adjusted for smaller screens */
    max-width: 25%;
  }
}

@media (max-width: 992px) {
  .card-col {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }
}

@media (max-width: 768px) {
  .card-col {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 576px) {
  .card-col {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
