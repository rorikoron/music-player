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
    cover: z.custom<Blob>(),
})

const formProps = ref<musicProps>({
  title: undefined,
  description: undefined,
  cover: undefined
})

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    
    // FileReaderを使ってBlobに変換
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: file.type });
      formProps.value.cover = blob;  // formProps.coverにBlobを格納
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  }
};
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