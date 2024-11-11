<script setup lang="ts">
import { z } from 'zod';
import type { musicProps } from '~/store/currentMusic';

const props = defineProps({
    onSubmit: {
        type: Function,
        required: true,
    }
});

const schema = z.object({
    title: z.string(),
    description: z.string(),
})


const formProps = ref<musicProps>({
  title: undefined,
  description: undefined
})

</script>

<template>
    <UForm :schema="schema" :state="formProps" class="p-2 flex flex-col gap-2" @submit="onSubmit(formProps)">
        <UFormGroup label="title" name="title">
            <UInput v-model="formProps.title"/>
        </UFormGroup>
        <UFormGroup label="descripition" name="desciption">
            <UInput v-model="formProps.description"/>
        </UFormGroup>

        
        <UButton type="submit" class="inline">
        Create
        </UButton>
    </UForm>
</template>