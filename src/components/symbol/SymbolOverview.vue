<script setup lang="ts">
import type { CandleData, HeadlineData } from '@/lib/stock';
import OverviewChart from './OverviewChart.vue';
import Headline from './Headline.vue';

defineProps<{
  chartData: CandleData[];
  headlines: HeadlineData[];
}>();
</script>

<template>
  <OverviewChart :data="chartData" />
  <h2>Recent News</h2>
  <div v-if="headlines.length == 0" class="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
    <Headline v-for="_ in Array(8)" :key="_" :data="null" />
  </div>
  <div v-if="headlines.length != 0" class="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
    <Headline v-for="headline in headlines" :key="headline.id" :data="headline" />
  </div>
</template>

<style scoped>
h2 {
  font-weight: bold;
  font-size: x-large;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
