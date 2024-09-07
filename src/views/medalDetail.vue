<template>
  <div class="medal-page">
    <div class="medal-detail">
      <div class="country-info">
        <img :src="medalDetail.flagUrl" alt="Flag" class="country-flag"/>
        <h1>{{ medalDetail.countryname }} medal tally</h1>
        <div class="medal-summary">


          <p><span class="medal gold" style="font-size: 50px"><img src="@/assets/gold.png" alt="gold" class="medal-icon"> {{ medalDetail.gold }}</span></p>
          <p><span class="medal silver" style="font-size: 50px"><img src="@/assets/silver.png" alt="silver" class="medal-icon"> {{ medalDetail.silver }}</span></p>
          <p><span class="medal bronze" style="font-size: 50px"><img src="@/assets/bronze.png" alt="bronze" class="medal-icon"> {{ medalDetail.bronze }}</span></p>
          <p>Total number of medals : {{ medalDetail.count }} ranking: {{ medalDetail.rank }}</p>
        </div>
      </div>
      <div class="medal-list">
        <h2>Detailed medal list</h2>
        <table class="medal-table">
          <thead>
          <tr>
            <th>project</th>
            <th>gold medal</th>
            <th>silver medal</th>
            <th>bronze medal</th>
            <th>total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in medalDetail.detailList" :key="item.id">
            <td>{{ item.itemName }}</td>
            <td>{{ item.gold }}</td>
            <td>{{ item.silver }}</td>
            <td>{{ item.bronze }}</td>
            <td>{{ item.total }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <userComments/>
  </div>
</template>

<script>
import { useUsersStore } from '@/store/users'
import userComments from "@/views/userComments.vue";
export default {
  name: "medalDetail",
  components: {
    userComments
  },
  data() {
    return {
      countryid: '',
      medalDetail: {}
    }
  },
  methods: {
    getMedalDetail() {
      useUsersStore().fetchDetailById(this.countryid).then((res) => {
        this.medalDetail = res
      })
    }
  },
  mounted() {
    // Retrieve parameters from the browser address bar
    this.countryid = this.$route.query.countryid
    this.getMedalDetail()
  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.medal-page {
  background-color: #f0f8ff;
  padding: 40px 0;
  min-height: 100vh;
}

.medal-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-image: url('@/assets/bg.jpg');
  background-size: cover;
  background-position: center;
}

.country-info {
  text-align: center;
  margin-bottom: 30px;

  .country-flag {
    width: 150px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
  }

  .medal-summary {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;

    p {
      font-size: 16px;
      margin: 0;
      color: #333;

      .medal {
        font-weight: bold;
      }

      .gold {
        color: #FFD700;
      }

      .silver {
        color: #C0C0C0;
      }

      .bronze {
        color: #CD7F32;
      }
    }
  }
}

.medal-list {
  margin-top: 20px;

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
  }

  .medal-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 8px;

    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 14px;
    }

    th {
      background-color: #f4f4f4;
      color: #333;
      font-weight: bold;
      font-size: 16px;
    }

    tr:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>
