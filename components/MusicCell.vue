<script setup lang="ts">
import { musicProps } from '~/store/currentMylist';

const props = defineProps<{
    music: musicProps,
    idx: number
}>();
</script>

<template>
    <span>{{ props.idx }}</span>
    <span>{{ props.music.title }}</span>
    <span>{{ props.music.lastUpdate }}</span>
    <span>{{ props.music.audioLength }}</span>
</template>