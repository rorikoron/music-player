<script setup lang="ts">
import { addMusic } from '~/composable/hooks/useDatabase';
import { state } from '~/store/currentMylist';
import { eventToBlob, eventToFileName, getAudioDuration } from '~/util/media';
import Musiclist from './Musiclist.vue';

const cover = computed(() => {
  if(!state.cover) return '';
  return  URL.createObjectURL(state.cover);
})
const musiclistRef = ref<typeof Musiclist>();

watch(
  ()=> state.id,
  () => {
    musiclistRef.value?.refreshMusic(state.id);
  }
)


const handleFileChange = async (e : Event) => {
  const blob = await eventToBlob(e);
  if(blob === undefined) return;

  const title = await eventToFileName(e);
  const date = new Date();
  const lastUpdate = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
  const audioLength = await getAudioDuration(blob);
  addMusic({title, lastUpdate, blob, audioLength, mylistId: state.id!});

  musiclistRef.value?.refreshMusic(state.id);
}


</script>

<template>
    
    <UCard class="flex-auto">
      <template #header v-if="state.title !== undefined"  >
        <div class="grid grid-cols-[180px_1fr] box-content gap-4">
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


    <template #footer v-if="state.title !== undefined"  >
      <UButton variant="ghost" class="">
        <template #icon>
          <UIcon name="material-symbols:play-circle" class="h-12 w-12"/>
        </template>
      </UButton>

      <div class="relative inline cursor-pointer">
        <UButton color="gray" variant="ghost" icon="i-mdi-music-note-plus"/>
        <input type="file" class="absolute top-0 left-0 opacity-0 h-full w-full z-0" accept=".mp3,.wav" @change="handleFileChange">
      </div>
      <UDivider />

      <div class="h-full w-full">
        <Musiclist ref="musiclistRef" :mylist-id="state.id ?? ''"/>
      </div>
    </template>
    </UCard>
</template>