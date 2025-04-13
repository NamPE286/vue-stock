<script setup lang="ts">
import SymbolHeader from '@/components/symbol/SymbolHeader.vue';
import SymbolOverview from '@/components/symbol/SymbolOverview.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { getSymbolHistoricalCandles, subscribeToPriceUpdates, getSymbolPrice, getSymbolNews } from '@/lib/stock';
import type { Candle, Stock } from '@/lib/stock';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router/auto';

const route = useRoute('/symbol/[sym]');
const sym = route.params.sym.toUpperCase();
let current = ref<Stock | null>(null);
let name = ref<string>(sym);
let candles: Ref<Candle[]> = ref([]);

function updatePrice(stock: Stock) {
  current.value = stock;
}

onMounted(() => {
  getSymbolPrice(sym).then((data) => {
    current.value = data;
  });
  subscribeToPriceUpdates(sym, updatePrice);
  getSymbolHistoricalCandles(sym).then((data) => {
    candles.value = data;
  })

  getSymbolNews(sym).then((data) => {
    console.log(data)
  });
});
</script>

<template>
  <Tabs value="0">
    <div class="sticky pt-[10px] z-2 mt-[-10px] top-0 bg-[#ffffff] dark:bg-[#121212]">
      <SymbolHeader :name="name" :data="current"></SymbolHeader>
      <TabList>
        <Tab value="0">Overview</Tab>
        <Tab value="1">News</Tab>
        <Tab value="2">Discussions</Tab>
      </TabList>
    </div>
    <TabPanels>
      <TabPanel value="0">
        <SymbolOverview :data="candles" />
      </TabPanel>
      <TabPanel value="1"> b </TabPanel>
      <TabPanel value="2"> c </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<style lang="css" scoped>
.p-tabpanels {
  background: transparent;
}

.p-tablist * {
  background-color: transparent;
}
</style>
