<script setup lang="ts">
import { musicProps } from '~/store/currentMylist';

const props = defineProps<{
    music: musicProps,
    idx: number
}>();

const computedAudioLength = computed(() => {
    let string = '';
    let totalSec = Math.round(props.music.audioLength);
    if(Math.floor(totalSec) / 3600 >= 1){
        string += (Math.floor(totalSec / 3600) + ':');
        totalSec -= Math.floor(totalSec / 3600) * 3600;
    } 
    if(Math.floor(totalSec) / 60 >= 1){
        string += (Math.floor(totalSec / 60) + ':');
        totalSec -= Math.floor(totalSec / 60) * 60;
    } 
    if(totalSec < 10){
        string += '0';
    }
    string += totalSec;

    return string
})
</script>

<template>
    <span>{{ props.idx }}</span>
    <span>{{ props.music.title }}</span>
    <span>{{ props.music.lastUpdate }}</span>
    <span>{{ computedAudioLength }}</span>
</template>