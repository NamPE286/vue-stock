<script setup lang="ts">
import type { Stock } from '@/lib/stock';
import Select from 'primevue/select';
import Skeleton from 'primevue/skeleton';

const props = defineProps<{
  name: string
  data: Stock | null;
}>();
let market = 'NASDAQ';
const arr: string[] = ['NASDAQ'];
</script>

<template>
  <div>
    <div class="flex flex-row gap-[10px] items-center">
      <div>
        <h3 class="font-bold text-xl">{{ name }}</h3>
        <p>
          <span v-if="data !== null" >
            <span class="text-3xl font-bold">{{ data.price }}</span> USD
          </span>
          <Skeleton v-if="data === null" class="mt-[3px]" width="12rem" height="2.1rem"></Skeleton>
          <span v-if="data !== null">
            <span v-if="data.change >= 0" class="font-bold text-green-500 text-lg">
              {{ props.data === null ? '' : `+${data?.change} (+${Math.round(data?.percentChange! * 100) / 100}%)` }}
            </span>
            <span v-if="data.change < 0" class="font-bold text-red-500 text-lg">
              {{ props.data === null ? '' : `${data?.change} (${Math.round(data?.percentChange! * 100) / 100}%)` }}
            </span>
          </span>
        </p>
      </div>
      <Select v-model="market" :options="arr" placeholder="Select a market" class="w-full md:w-56 ml-auto mr-[50px]"></Select>
    </div>
  </div>
</template>
