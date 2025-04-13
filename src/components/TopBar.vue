<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { ref } from 'vue';

interface Link {
  url: string;
  icon: string;
  title: string;
}

const links: Link[] = [
  { url: '/', icon: 'pi-home', title: 'Dashboard' },
  { url: '/chat', icon: 'pi-comments', title: 'Discussion' },
];

let drawerVisible = ref(false);
let value = ref('');
</script>

<template>
  <div class="h-full w-full bg-[#ffffff] dark:bg-[#121212] flex items-center">
    <div class="flex items-center md:hidden">
      <div class="card flex justify-center ml-[5px]">
        <Drawer v-model:visible="drawerVisible">
          <div v-for="link in links" :key="link.url">
            <a :href="link.url">
              <Button class="w-full h-[50px] aspect-square" variant="text">
                <span :class="`pi ${link.icon} mr-[10px]`" style="font-size: 1.2rem"></span>
                <span class="text-black dark:text-white">{{ link.title }}</span>
              </Button>
            </a>
          </div>
        </Drawer>
        <Button icon="pi pi-bars" variant="text" rounded @click="drawerVisible = true" />
      </div>
      <a href="/">
        <img class="h-[20px] ml-[5px]" src="/src/assets/logo.ico" alt="logo" />
      </a>
    </div>
    <div class="hidden md:flex items-center">
      <span class="pi pi-search absolute text-gray-400 ml-[10px]" style="font-size: 1rem"></span>
      <InputText
        class="h-[35px] w-[360px]"
        type="text"
        v-model="value"
        variant="filled"
        placeholder="Search for Symbols"
      />
    </div>
    <div class="ml-auto flex items-center gap-[10px]">
      <Button icon="pi pi-bell" variant="text" rounded></Button>
      <button class="cursor-pointer">
        <Avatar label="V" class="mr-2" size="medium" shape="circle" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.p-inputtext {
  font-size: small;
  padding-left: 35px;
}
</style>
