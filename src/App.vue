<script setup lang="ts">
import SideNavBar from './components/SideNavBar.vue';
import TopNavBar from './components/TopNavBar.vue';
import AppBar from './components/AppBar.vue';
import { RouterView } from 'vue-router/auto';
</script>

<template>
  <div class="fixed w-[80px] h-full hidden md:block">
    <SideNavBar />
  </div>
  <div class="sticky top-0 z-10 h-[70px] w-full mb-[10px] md:hidden">
    <TopNavBar />
  </div>
  <div class="md:ml-[95px] pr-[10px] relative">
    <div class="sticky top-0 z-10 h-[70px] w-full mb-[10px] hidden md:block">
      <AppBar />
    </div>
    <RouterView />
  </div>
</template>
