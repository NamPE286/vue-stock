<script setup lang="ts">
import OverviewChart from './OverviewChart.vue';
import Headline from './Headline.vue';
import { onMounted } from 'vue';
import {
  getSymbolHistoricalCandles,
  getSymbolNews,
} from '@/lib/stock';
import type { CandleData, HeadlineData } from '@/lib/stock';
import { ref } from 'vue';

const props = defineProps<{
  sym: string
}>()

let chartData = ref<CandleData[]>([])
let headlines=  ref<HeadlineData[]>([])

onMounted(() => {
  getSymbolHistoricalCandles(props.sym).then((data) => {
    chartData.value = data;
  });
  getSymbolNews(props.sym).then((data) => {
    headlines.value = data;
  });
});
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
