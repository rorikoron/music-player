<script setup>
import ControlPanel from '~/components/ControlPanel.vue';
import { useDatabase } from '~/composable/hooks/useDatabase';

const db = useDatabase();
</script>
<template>
    <div class="box-border w-dvw h-full grid grid-cols-[30%_70%] gap-4 p-6 [&>*]:h-full [&>*]:overflow-hidden">
        <Mylist />
        <ControlPanel />
    </div>
</template>