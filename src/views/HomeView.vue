<template>
  <div class="home">
    <Article></Article>
  </div>
</template>

<script setup>
// @ is an alias to /src
import Article from '@/components/articleComponent.vue'
import { storeToRefs } from 'pinia'
import { articleState } from '@/store';

document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;

const articleStateObj = articleState()

const { articleList } = storeToRefs(articleStateObj)
articleList.value.map(i => {
  if (i.content.length <= 100) {
    i.comput_content = i.content
  }
  else {
    let str = i.content
    i.comput_content = str.slice(0, str.indexOf('<br>'))
  }
  return i
})

</script>
