<script setup>
import ControlPanel from '~/components/ControlPanel.vue';
import { useDatabase } from '~/composable/hooks/useDatabase';

const db = useDatabase();
</script>
<template>
    <div class="box-border w-dvw h-auto grid grid-cols-[30%_70%] gap-4 p-6">
        <Mylist />
        <ControlPanel />
    </div>
</template>