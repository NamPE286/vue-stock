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
        <h3 v-if="name !== ''" class="font-bold text-xl">{{ name }}</h3>
        <Skeleton v-if="name === ''" class="mb-[5px]" width="10rem" height="2rem"></Skeleton>
        <p>
          <span v-if="data !== null" class="text-3xl font-bold">
            {{ data.price }} USD
          </span>
          <Skeleton v-if="data === null" width="12rem" height="2.5rem"></Skeleton>
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
