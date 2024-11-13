<script setup lang="ts">
import { z } from 'zod';
import type { mylistProps } from '~/store/currentMylist';
import { eventToBlob } from '~/util/media';

const props = defineProps({
    onSubmit: {
        type: Function,
        required: true,
    }
});

const schema = z.object({
    title: z.string(),
    description: z.string(),
    cover: z.custom<Blob>(),
})

const formProps = ref<mylistProps>({
  title: undefined,
  description: undefined,
  cover: undefined
})

async function handleFileChange(e : Event){
  formProps.value.cover = await eventToBlob(e);
}

</script>

<template>
    <UForm :schema="schema" :state="formProps" class="p-2 flex flex-col gap-2" @submit="{onSubmit(formProps); console.log(formProps)}">
        <UFormGroup label="title" name="title">
            <UInput v-model="formProps.title"/>
        </UFormGroup>
        <UFormGroup label="descripition" name="desciption">
            <UInput v-model="formProps.description"/>
        </UFormGroup>
        <label for="cover">select cover</label>
        <input id="cover" type="file" name="cover" accept=".png,.jpg"  @change="handleFileChange" />
        
        <UButton type="submit" class="inline">
        Create
        </UButton>
    </UForm>
</template>