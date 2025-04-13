<script setup lang="ts">
import type { HeadlineData } from '@/lib/stock';
import Skeleton from 'primevue/skeleton';

defineProps<{
  data: HeadlineData | null;
}>();

function timeAgoFromNow(date: Date) {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) {
    return `${diff} seconds ago`;
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  }

  if (diff < 2592000) {
    return `${Math.floor(diff / 86400)} days ago`;
  }

  if (diff < 31536000) {
    return `${Math.floor(diff / 2592000)} months ago`;
  }

  return `${Math.floor(diff / 31536000)} years ago`;
}
</script>

<template>
  <div
    v-if="data === null"
    class="flex items-center gap-[20px] h-[100px] hover:bg-[#d8dadb] dark:hover:bg-[#26262b] rounded-2xl duration-200 ease-in-out p-[10px]"
  >
    <div class="flex flex-col gap-[5px]">
      <Skeleton width="15rem" height="1.2rem"></Skeleton>
      <Skeleton width="9rem" height="1rem"></Skeleton>
    </div>
    <Skeleton class="ml-auto" width="7rem" height="100%"></Skeleton>
  </div>
  <a v-if="data" :href="data.url" target="_blank">
    <div
      class="flex items-center gap-[20px] h-[100px] hover:bg-[#d8dadb] dark:hover:bg-[#26262b] rounded-2xl duration-200 ease-in-out p-[10px]"
    >
      <div class="w-full">
        <h3 class="text-medium font-bold">
          {{ data.headline }}
        </h3>
        <p class="text-sm text-[#606060] dark:text-[#aaaaaa]">
          {{ data.source }} • {{ timeAgoFromNow(data.time) }}
        </p>
      </div>
      <img
        v-if="data.image != ''"
        :src="data.image"
        alt="news thumbnail"
        class="h-full aspect-4/3 object-cover rounded-2xl"
      />
    </div>
  </a>
</template>
