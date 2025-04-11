<script setup lang="ts">
import SymbolHeader from '@/components/symbol/SymbolHeader.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
</script>

<template>
  <Tabs value="0">
    <div class="sticky pt-[10px] mt-[-10px] top-0 bg-[#ffffff] dark:bg-[#121212]">
      <SymbolHeader></SymbolHeader>
      <TabList>
        <Tab value="0">Overview</Tab>
        <Tab value="1">News</Tab>
        <Tab value="2">Discussions</Tab>
      </TabList>
    </div>
    <TabPanels class="h-[1000px]">
      <TabPanel value="0"> a </TabPanel>
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
