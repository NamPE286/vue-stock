<script setup lang="ts">
import type { Candle } from '@/lib/stock';
import OverviewChart from './OverviewChart.vue';
import News from './News.vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  chartData: Candle[];
}>();
</script>

<template>
  <OverviewChart :data="chartData"/>
  <h2>Recent News</h2>
  <News/>
</template>

<style scoped>
h2 {
  font-weight: bold;
  font-size: x-large;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
