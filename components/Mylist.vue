<script setup lang="ts">
import { _padding } from '#tailwind-config/theme';
import CreateForm from '~/composable/CreateForm.vue';
import DropDownIcon from '~/composable/DropDownIcon.vue';
import {  addMylist, getMylistAll, } from '~/composable/hooks/useDatabase';
import { setCurrentMusic, state, type mylistProps } from '~/store/currentMylist';

const mylists = ref<mylistProps[]>([]);
const isCreate = ref(false);
const createPlaylistMethod = [
    [{
        label: 'Create New Playlist',
        click: () => {
            isCreate.value = true;
        }
    },{
        label: 'Load from google drive',
    }]
]

const refreshPlaylist = async () => {
    const data = await getMylistAll();
    mylists.value = data;
}

onMounted( async ()=> {
    refreshPlaylist();
})

const createPlaylist = async (props: mylistProps) => {
    const data = Object.assign({} , props);
    addMylist(data);
    refreshPlaylist();
}
const updateCurrentMusic = (newData : mylistProps) => {
    setCurrentMusic(newData);
}

const getURL = (blob: Blob | undefined) => {
    if(!blob) return '';
    return URL.createObjectURL(blob);
}

</script>

<template>
    <UModal v-model="isCreate" prevent-close>
        <div class="p-4">
            <div class="flex justify-between">
                <span class="text-xl">Create New Playlist!</span>
                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isCreate=false" />
            </div>
            <CreateForm  :onSubmit="(props : any) => {createPlaylist(props); isCreate=false}" />
        </div>
    </UModal>

    <UCard class="h-full grid grid-rows-[max-content_1fr] [&>*]:overflow-auto [&>*]:px-2">
        <template #header>
            <div class="flex justify-between text-2xl items-center" >
                <span><UIcon name="material-symbols-light:book-4-outline" class="h-7 pr-10 align-middle" style="aspect-ratio: 1/1;"/>mylists</span>
                <DropDownIcon :menu="createPlaylistMethod" icon="material-symbols:add-rounded"/>
            </div>
        </template>


        <template #footer>
            <div class="h-full overflow-auto">
                <div class="flex flex-col gap-2 px-2 py-2">
                    <div v-for="mylist in mylists" :key="mylist.title" class="cursor-pointer" @click="updateCurrentMusic(mylist)">
                        <UAlert :title="mylist.title" :description="mylist.description" class="transition-all hover:bg-neutral-200 p-2.5" >
                            <template #icon>
                                <div class="h-16 rounded overflow-hidden" style="aspect-ratio: 1/1;">
                                    <img :src="getURL(mylist.cover)" class="w-full h-full object-cover">
                                </div>
                            </template>
                        </UAlert>
                    </div>
                </div>
            </div>
        </template>
    </UCard>
</template>