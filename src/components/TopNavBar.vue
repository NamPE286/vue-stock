<script setup lang="ts">
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { ref } from 'vue';

interface Link {
  url: string;
  icon: string;
  title: string
}

const links: Link[] = [
  { url: '/', icon: 'pi-home', title: 'Dashboard' },
  { url: '/chat', icon: 'pi-comments', title: 'Discussion' },
];

let visible = ref(false);
</script>

<template>
  <div class="h-full bg-[#ffffff] dark:bg-[#121212] pl-[10px] pr-[10px] flex items-center">
    <div class="card flex justify-center">
      <Drawer v-model:visible="visible" header="Vue Stock">
        <div v-for="link in links" :key="link.url">
          <a :href="link.url">
            <Button class="w-full h-[50px] aspect-square" variant="text">
              <span :class="`pi ${link.icon} mr-[10px]`" style="font-size: 1.2rem"></span>
              <span class="text-black dark:text-white">{{ link.title }}</span>
            </Button>
          </a>
        </div>
      </Drawer>
      <Button icon="pi pi-bars" variant="text" rounded @click="visible = true" />
    </div>
    <a href="/">
      <img class="h-[20px] ml-[10px]" src="/src/assets/logo.ico" alt="logo" />
    </a>
  </div>
</template>
