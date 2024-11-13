<script setup>
import { state } from '/store/currentMusic';
const cover = computed(() => {
  if(!state.cover) return '';
  return  URL.createObjectURL(state.cover);
})
</script>

<template>
    
    <UCard class="flex-auto">
      <template #header v-if="state.title !== undefined"  >
        <div class="grid grid-cols-[140px_1fr] box-content gap-4">
          <figure>
            <img :src="cover" class="shadow object-cover" style="aspect-ratio: 1/1;"/>
          </figure>
          <div class="flex flex-col justify-between font-mono">
            <span class="text-m">{{ state.status }}</span>
            <span class="text-5xl">{{ state.title }}</span>
            <span class="text-m">{{ state.description }}</span>
          </div>
        </div>
      </template>


    <template #footer>
    </template>
    </UCard>
</template>