<script setup>

const links = [{
  label: 'music-player',
  
}]

</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
  <slot />
  <Player />
</template>