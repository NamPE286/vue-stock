<script setup lang="ts">
import SideNavBar from './components/SideNavBar.vue';
import TopBar from './components/TopBar.vue';
import { RouterView } from 'vue-router/auto';
</script>

<template>
  <div class="fixed w-[80px] h-full hidden md:block">
    <SideNavBar />
  </div>
  <div class="md:ml-[95px] md:pr-[10px] relative">
    <div class="sticky top-0 z-10 pr-[5px] h-[70px] w-full mb-[10px]">
      <TopBar />
    </div>
    <RouterView />
  </div>
</template>
