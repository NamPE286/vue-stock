<script setup lang="ts">
import SymbolHeader from '@/components/symbol/SymbolHeader.vue';
import SymbolOverview from '@/components/symbol/SymbolOverview.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import {
  getSymbolHistoricalCandles,
  subscribeToPriceUpdates,
  getSymbolPrice,
  getSymbolNews,
  getSymbolProfile
} from '@/lib/stock';
import type { CandleData, StockData, HeadlineData, ProfileData } from '@/lib/stock';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router/auto';

const route = useRoute('/symbol/[sym]');
const sym = route.params.sym.toUpperCase();

let current = ref<StockData | null>(null);
let profile = ref<ProfileData | null>(null);
let candles = ref<CandleData[]>([]);
let headlines = ref<HeadlineData[]>([]);

function updatePrice(stock: StockData) {
  current.value = stock;
}

onMounted(() => {
  getSymbolPrice(sym).then((data) => {
    current.value = data;
  });
  subscribeToPriceUpdates(sym, updatePrice);
  getSymbolHistoricalCandles(sym).then((data) => {
    candles.value = data;
  });
  getSymbolNews(sym).then((data) => {
    headlines.value = data;
  });
  getSymbolProfile(sym).then((data) => {
    profile.value = data;
  })
});
</script>

<template>
  <Tabs value="0">
    <div class="sticky pt-[10px] z-2 mt-[-10px] top-0 bg-[#ffffff] dark:bg-[#121212]">
      <SymbolHeader :profile="profile" :data="current"></SymbolHeader>
      <TabList>
        <Tab value="0">Overview</Tab>
        <Tab value="1">Profile</Tab>
        <Tab value="2">Discussions</Tab>
      </TabList>
    </div>
    <TabPanels>
      <TabPanel value="0">
        <SymbolOverview :chart-data="candles" :headlines="headlines"/>
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
