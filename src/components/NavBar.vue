<script setup lang="ts">
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'

interface Link {
  url: string
  icon: string
}

const links: Link[] = [
  { url: '/', icon: 'pi-home' },
  { url: '/chat', icon: 'pi-comments' },
]
</script>

<template>
  <div
    class="w-full h-full rounded-2xl p-5 bg-[#f8fafc] dark:bg-[#18181b] flex flex-col justify-between"
  >
    <div class="flex flex-col h-[100%]">
      <div class="flex flex-col gap-1">
        <div v-for="link in links" :key="link">
          <a :href="link.url">
            <Button class="w-full aspect-square" variant="text">
              <span :class="`pi ${link.icon}`" style="font-size: 1rem"></span>
            </Button>
          </a>
        </div>
      </div>
      <div class="flex flex-col mt-auto justify-center items-center">
        <a href="/settings" class="flex flex-col">
          <Button class="w-full aspect-square" variant="text">
            <span :class="`pi pi-cog`" style="font-size: 1rem"></span>
          </Button>
        </a>
        <Divider />
        <a href="/profile">
          <Avatar icon="pi pi-user" shape="circle" />
        </a>
      </div>
    </div>
  </div>
</template>
