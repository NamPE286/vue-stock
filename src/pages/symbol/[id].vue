<script setup lang="ts">
import SymbolHeader from '@/components/symbol/SymbolHeader.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
</script>

<template>
  <SymbolHeader></SymbolHeader>
  <Tabs value="0">
    <TabList>
      <Tab value="0">Overview</Tab>
      <Tab value="1">News</Tab>
      <Tab value="2">Discussions</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="0"> a </TabPanel>
      <TabPanel value="1"> b </TabPanel>
      <TabPanel value="2"> c </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<style lang="css" scoped>
.p-tabs * {
  background: transparent;
}
</style>
