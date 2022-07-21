<template>
  <div class="home">
    <Article></Article>
  </div>
</template>

<script setup>
// @ is an alias to /src
import Article from '@/components/articleComponent.vue'
const props = defineProps({
  dark: Boolean
})
</script>
