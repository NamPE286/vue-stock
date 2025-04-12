<script setup lang="ts">
import SymbolHeader from '@/components/symbol/SymbolHeader.vue';
import SymbolOverview from '@/components/symbol/SymbolOverview.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { getSymbolHistoricalCandles, subscribeToPriceUpdates, getSymbolPrice, getSymbolName } from '@/lib/stock';
import type { Candle, Stock } from '@/lib/stock';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router/auto';

const route = useRoute('/symbol/[sym]');
const sym = route.params.sym.toUpperCase();
let current = ref<Stock | null>(null);
let name = ref<string>("");
let candles: Candle[] = []

function updatePrice(stock: Stock) {}

onMounted(() => {
  getSymbolName(sym).then((data) => {
    name.value = data + ` (${sym})`;
  });
  getSymbolPrice(sym).then((data) => {
    current.value = data;
  });
  subscribeToPriceUpdates(sym, updatePrice);
  // console.log(await getSymbolHistoricalCandles(sym))
});
</script>

<template>
  <Tabs value="0">
    <div class="sticky pt-[10px] mt-[-10px] top-0 bg-[#ffffff] dark:bg-[#121212]">
      <SymbolHeader :name="name" :data="current"></SymbolHeader>
      <TabList>
        <Tab value="0">Overview</Tab>
        <Tab value="1">News</Tab>
        <Tab value="2">Discussions</Tab>
      </TabList>
    </div>
    <TabPanels class="h-[1000px]">
      <TabPanel value="0">
        <SymbolOverview />
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
