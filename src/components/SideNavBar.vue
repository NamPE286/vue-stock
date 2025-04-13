<script setup lang="ts">
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import Div from './Div.vue';

interface Link {
  url: string;
  icon: string;
  title: string;
}

const links: Link[] = [
  { url: '/', icon: 'pi-home', title: 'Dashboard' },
  { url: '/chat', icon: 'pi-comments', title: 'Discussion' },
];
</script>

<template>
  <Div class="w-full h-full flex flex-col justify-between">
    <div class="flex flex-col h-[100%]">
      <div class="flex flex-col gap-1 items-center">
        <a href="/">
          <img class="h-[20px] mb-[10px]" src="/src/assets/logo.ico" alt="logo" />
        </a>
        <div v-for="link in links" :key="link.url">
          <a :href="link.url">
            <Button
              v-tooltip="{
                value: link.title,
                pt: {
                  root: 'ml-[25px]',
                },
              }"
              class="w-full aspect-square"
              variant="text"
            >
              <span :class="`pi ${link.icon}`" style="font-size: 1rem"></span>
            </Button>
          </a>
        </div>
      </div>
      <div class="flex flex-col mt-auto justify-center items-center">
        <a href="/settings" class="flex flex-col">
          <Button
            v-tooltip="{
              value: 'Settings',
              pt: {
                root: 'ml-[25px]',
              },
            }"
            class="w-full aspect-square"
            variant="text"
          >
            <span :class="`pi pi-cog`" style="font-size: 1rem"></span>
          </Button>
        </a>
        <Divider />
        <a
          href="/profile"
          v-tooltip="{
            value: 'Profile',
            pt: {
              root: 'ml-[25px]',
            },
          }"
        >
          <Avatar icon="pi pi-user" shape="circle" />
        </a>
      </div>
    </div>
  </Div>
</template>
