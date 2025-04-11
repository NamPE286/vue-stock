<script setup lang="ts">
import { useRoute } from 'vue-router/auto'

const route = useRoute('/symbol/[id]')

console.log(route.params.id)
</script>

<template>
  <p>{{ route.params.id }}</p>
</template>