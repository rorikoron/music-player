<script setup>
const props = defineProps({
    icon:{
        type: String,
        required: true,
    },
    menu:{
        type: Array,
        required: true,
    }
})
</script>


<template>
    <UDropdown :items="props.menu" :popper="{ placement: 'bottom-start' }">
        <UIcon :name="props.icon" class="h-8 w-8 align-middle cursor-pointer"/>
    </UDropdown>
</template>