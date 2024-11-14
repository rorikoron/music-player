<script setup lang="ts">
import { musicProps } from '~/store/currentMylist';

const props = defineProps<{
    music: musicProps,
    idx: number
}>();
</script>

<template>
        <td>{{ props.idx }}</td>
        <td>{{ props.music.title }}</td>
        <td>{{ props.music.lastUpdate }}</td>
        <td>{{ props.music.audioLength }}</td>
</template>