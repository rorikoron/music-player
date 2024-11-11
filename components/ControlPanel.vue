<script setup>
import { state } from '/store/currentMusic';


</script>

<template>
    
    <UCard class="flex-auto">
    <template #header >
      <UAlert :color="transparent" :variant="outline" :title="state.title" :description="state.description"/>
    </template>


    <template #footer>
    </template>
    </UCard>
</template>