<script lang="ts" setup>
import { content } from 'googleapis/build/src/apis/content';

interface AudioSource{
    blob: string,
    name: string,
}
onMounted( async () =>{
    const data = await $fetch<AudioSource[]>('/api/fetchPlaylist', {
        params: { 
            id: "1ayAitM-8z3E8-8NFQaktQGlsVsUG5BGd"
        }
    })
    console.log(data)

    //const blob = data[0].blob.blob();
})



const playAudio = async () => {
  try {
    const response = await fetch('/api/get-audio');
    const blob = await response.blob();
    
    // BlobデータをURLに変換
    const audioUrl = URL.createObjectURL(blob);
    
    // Audioオブジェクトを作成し、再生
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error('音声の再生に失敗しました:', error);
  }
};

</script>

<template>
  <div class="flex">

  </div>
</template>