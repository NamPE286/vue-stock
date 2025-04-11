<script setup lang="ts">
import Select from 'primevue/select'

let selectedOption = 'NASDAQ'
const arr: string[] = ['NASDAQ', 'A', 'B']
</script>

<template>
  <div>
    <div class="flex flex-row gap-[10px] items-center">
      <img
        class="h-[50px] w-[50px] rounded-full"
        src="https://s3-symbol-logo.tradingview.com/apple--big.svg"
        alt="company logo"
      />
      <div>
        <h3 class="font-bold text-xl">Apple Inc. (AAPL)</h3>
        <p><span class="text-3xl font-bold">200.00</span> USD <span class="font-bold text-green-500 text-lg">+2.23 (+1.22%)</span></p>
      </div>
      <Select
        v-model="selectedOption"
        :options="arr"
        placeholder="Select a market"
        class="w-full md:w-56 ml-auto mr-[50px]"
      ></Select>
    </div>
  </div>
</template>
