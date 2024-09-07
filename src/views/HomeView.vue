<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <MedalRanking />
  </div>
</template>

<script>
import MedalRanking from '@/components/MedalRanking.vue'

export default {
  name: 'HomeView',
  components: {
    MedalRanking
  }
}
</script>
