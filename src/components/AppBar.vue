<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import { ref } from 'vue';

let value = ref('');
</script>

<template>
  <div class="h-full w-full bg-[#ffffff] dark:bg-[#121212] flex items-center">
    <span class="pi pi-search absolute text-gray-400 ml-[10px]" style="font-size: 1rem"></span>
    <InputText
      class="h-[35px] w-[360px]"
      type="text"
      v-model="value"
      variant="filled"
      placeholder="Search for Symbols"
    />
    <div class="ml-auto flex items-center gap-[10px]">
      <Button icon="pi pi-bell" variant="text" rounded></Button>
      <button class="cursor-pointer">
        <Avatar
          label="V"
          class="mr-2"
          size="medium"
          shape="circle"
        />
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
