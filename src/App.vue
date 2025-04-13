<script setup lang="ts">
import SideNavBar from './components/SideNavBar.vue';
import TopNavBar from './components/TopNavBar.vue';
import { RouterView } from 'vue-router/auto';
</script>

<template>
  <div class="fixed w-[100px] h-full p-[10px] hidden md:block">
    <SideNavBar />
  </div>
  <div class="sticky top-0 z-10 h-[70px] w-full mb-[10px] md:hidden">
    <TopNavBar />
  </div>
  <div class="md:ml-[100px] md:p-[10px] relative">
    <RouterView />
  </div>
</template>
