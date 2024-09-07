<!-- src/components/MedalRanking.vue -->
<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="carousel">
        <img src="@/assets/courls_4.png" alt="Olympic moments">
      </div>

      <div class="medal-ranking">
        <h2>Olympic medal ranking</h2>
        <div class="table-container">
          <table>
            <thead>
            <tr>
              <th>ranking</th>
              <th>country</th>
              <th><img src="@/assets/gold.png" alt="金牌" class="medal-icon"> gold</th>
              <th><img src="@/assets/silver.png" alt="银牌" class="medal-icon"> silver</th>
              <th><img src="@/assets/bronze.png" alt="铜牌" class="medal-icon"> bronze</th>
              <th>total</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="country in medalList" :key="country.countryid">
              <td>{{ country.rank }}</td>
              <td @click="toDetail(country.countryid)">{{ country.countryname }}<img :src="country.flagUrl" style="height: 10px;width: 15px"></td>
              <td>{{ country.gold }}</td>
              <td>{{ country.silver }}</td>
              <td>{{ country.bronze }}</td>
              <td>{{ country.count }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from '@/store/users'

export default {
  name: 'MedalRanking',
  computed: {
    medalList() {
      return useUsersStore().medalList
    },
    currentPage() {
      return useUsersStore().pagination.currentPage
    },
    totalPages() {
      return useUsersStore().pagination.totalPages
    },
    updateTime() {
      return useUsersStore().updateTime
    }
  },
  methods: {
    toDetail(countryid) {
      this.$router.push({ path: '/medalDetail', query: { countryid:countryid } })
    },
    prevPage() {
      if (this.currentPage > 1) {
        useUsersStore().fetchMedalList(this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        useUsersStore().fetchMedalList(this.currentPage + 1)
      }
    }
  },
  mounted() {
    useUsersStore().fetchMedalList()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
}

.page-container {
  background-image: url('@/assets/bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2vh;
}

.carousel {
  height: 20vh;
  min-height: 100px;
  max-height: 200px;
  margin-bottom: 2vh;
  overflow: hidden;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.medal-ranking {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

h2 {
  text-align: center;
  padding: 1rem;
}

.table-container {
  flex: 1;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f8f8;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: sticky;
  top: 0;
  z-index: 10;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.medal-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}

.pagination {
  padding: 1rem;
  text-align: center;
}

button {
  margin: 0 10px;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-height: 600px) {
  .carousel {
    display: none;
  }

  .medal-ranking {
    margin-top: 1vh;
  }
}

@media (max-width: 768px) {
  th, td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
