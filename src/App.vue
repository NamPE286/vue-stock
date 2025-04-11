<script setup lang="ts">
import NavBar from "./components/NavBar.vue"
import { RouterView } from "vue-router/auto";
</script>

<template>
  <div class="fixed w-[100px] h-full p-[10px]">
    <NavBar/>
  </div>

  <div class="ml-[100px] p-[10px]">
    <RouterView />
  </div>
</template>
