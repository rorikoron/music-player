<script setup lang="ts">
import { getMusic } from '~/composable/hooks/useDatabase';
import { musicProps } from '~/store/currentMylist';

const props = defineProps({
    mylistId:{
        type: String,
        required: true
    }
})
const tableHeader = ['#', 'Title', 'Published Date', 'Audio Length']

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
    <table class="w-full ">
        <thead>
            <tr class="text-left p-4">
                <th v-for="header in tableHeader" class="p-2">{{ header }}</th>
            </tr>
        </thead>
        <tbody class="[&_th]:p-4">
            <tr v-for="(music, i) in musiclist" class="hover:bg-neutral-200 transition-all [&>td]:py-4 [&>td]:px-2 cursor-pointer" >
                <MusicCell 
                    :key="i" 
                    :music="music" 
                    :idx="i+1" 
                />
            </tr>
        </tbody>
    </table>
</template>