<script setup lang="ts">
import Button from 'primevue/button';
</script>

<template>
  <div class="h-full bg-[#ffffff] dark:bg-[#121212] pl-[10px] pr-[10px] flex items-center">
    <Button icon="pi pi-bars" variant="text" rounded aria-label="Filter"></Button>
    <a href="/">
      <img class="h-[20px] ml-[10px]" src="/src/assets/logo.ico" alt="logo" />
    </a>
  </div>
</template>
