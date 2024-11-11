<script setup lang="ts">
import CreateForm from '~/composable/CreateForm.vue';
import { addDataBase, getDataBase, getDataBaseAll, useDatabase } from '~/composable/hooks/useDatabase';
import { setCurrentMusic, state, type musicProps } from '~/store/currentMusic';

const mylists = ref<musicProps[]>([]);
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
    const data = await getDataBaseAll();
    mylists.value = data;
}

onMounted( async ()=> {
    refreshPlaylist();
})

const createPlaylist = async (props: musicProps) => {
    const data = Object.assign({} , props);
    addDataBase(data);
    refreshPlaylist();
}
const updateCurrentMusic = (newData : musicProps) => {
    setCurrentMusic(newData);
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

    <UCard>
    <template #header>
        <div class="flex justify-between text-2xl items-center" >
            <span><UIcon name="material-symbols-light:book-4-outline" class="h-7 w-7 pr-10 align-middle"/>mylists</span>
            <UDropdown :items="createPlaylistMethod" :popper="{ placement: 'bottom-start' }">
                <UIcon name="material-symbols:add-rounded" class="h-8 w-8 align-middle cursor-pointer"/>
            </UDropdown>
        </div>
    </template>


    <template #footer>
        <div class="flex flex-col gap-2">
            <div v-for="mylist in mylists" :key="mylist.title" class="cursor-pointer" @click="updateCurrentMusic(mylist)">
                <UAlert  :title="mylist.title" :description="mylist.description" class="transition-all hover:bg-neutral-200" />
            </div>
        </div>
    </template>
    </UCard>
</template>