<script setup lang="ts">
import type { ProfileData, StockData } from '@/lib/stock';
import { ref } from 'vue';
import Badge from 'primevue/badge';
import Skeleton from 'primevue/skeleton';

const props = defineProps<{
  profile: ProfileData | null;
  data: StockData | null;
}>();
let imageLoaded = ref(false);
</script>

<template>
  <div>
    <div v-if="profile === null || data === null" class="flex gap-[10px] items-center">
      <Skeleton shape="circle" width="65px" height="65px"></Skeleton>
      <div class="flex flex-col">
        <Skeleton class="mt-[3px]" width="9rem" height="1.6rem"></Skeleton>
        <Skeleton class="mt-[3px]" width="15rem" height="2rem"></Skeleton>
      </div>
    </div>
    <div v-else class="flex gap-[10px] items-center">
      <Skeleton
        v-if="!imageLoaded"
        class="mr-[-75px]"
        shape="circle"
        width="65px"
        height="65px"
      ></Skeleton>
      <img
        class="h-[60px] aspect-square rounded-full"
        :src="profile.logo"
        @load="() => (imageLoaded = true)"
      />
      <div>
        <div >
          <h3 v-if="profile" class="font-bold text-xl">
            {{ profile.name }}
            <Badge size="large">{{ profile.ticker }}</Badge>
            <Badge size="large" class="ml-[5px]">{{ profile.exchange }}</Badge>
          </h3>
        </div>
        <p>
          <span v-if="data !== null" class="mr-[5px]">
            <span class="text-3xl font-bold">{{ data.price }}</span> {{ profile?.currency }}
          </span>
          <span v-if="data !== null">
            <span v-if="data.change >= 0" class="font-bold text-green-500 text-lg">
              {{
                props.data === null
                  ? ''
                  : `+${data?.change} (+${Math.round(data?.percentChange! * 100) / 100}%)`
              }}
            </span>
            <span v-if="data.change < 0" class="font-bold text-red-500 text-lg">
              {{
                props.data === null
                  ? ''
                  : `${data?.change} (${Math.round(data?.percentChange! * 100) / 100}%)`
              }}
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
