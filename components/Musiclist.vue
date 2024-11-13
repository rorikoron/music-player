<script setup lang="ts">
import { getMusic } from '~/composable/hooks/useDatabase';
import { musicProps } from '~/store/currentMylist';

const props = defineProps({
    mylistId:{
        type: String,
        required: true
    }
})
const musiclist = ref<musicProps[]>([]);

onMounted(async () => {
    refreshMusic();
})


const refreshMusic = async (mylistId : string) =>{
  musiclist.value = await getMusic(mylistId);
}

defineExpose({refreshMusic})
</script>

<template>
    <div>
        <div v-for="music in musiclist">
            {{ music.title }}
        </div>
    </div>
</template>