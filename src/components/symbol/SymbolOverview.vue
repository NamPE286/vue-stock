<script setup lang="ts">
import type { Candle } from '@/lib/stock';
import OverviewChart from './OverviewChart.vue';

const props = defineProps<{
  data: Candle[];
}>();
</script>

<template>
  <h2>AAPL Chart (last trading day)</h2>
  <OverviewChart :data="data"/>
</template>

<style scoped>
h2 {
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 10px;
}
</style>
