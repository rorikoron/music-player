<script setup lang="ts">
import { getMusic } from '~/composable/hooks/useDatabase';
import { musicProps } from '~/store/currentMylist';

const props = defineProps({
    mylistId:{
        type: String,
        required: true
    }
})
const tableHeader = [ '#', 'Title', 'Published Date', 'Audio Length'];

const musiclist = ref<musicProps[]>([]);

onMounted(async () => {
    refreshMusic(props.mylistId);
})


const refreshMusic = async (mylistId : string) =>{
  musiclist.value = await getMusic(mylistId);
}

defineExpose({refreshMusic})
</script>

<template>
    <div class="w-full [&>*]:grid [&>*]:grid-cols-[5%_1fr_15%_15%]">
        <div class="text-left p-2 w-full">
            <span v-for="header in tableHeader" >{{ header }}</span>
        </div>
        <div v-for="(music, i) in musiclist" class="text-left p-2 w-full hover:bg-neutral-200 transition-all cursor-pointer" >
            <MusicCell 
                :key="i" 
                :music="music" 
                :idx="i+1" 
            />
        </div>
    </div>
</template>