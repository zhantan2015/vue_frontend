<template>
  <div class="home">
    <Skeleton v-if="!articleList || articleList.length == 0">

    </Skeleton>
    <Article v-else class="article" v-for="article in articleList" :key="article.aid" :article="article"></Article>
  </div>
</template>

<script setup>
// @ is an alias to /src

// import Article from '@/components/ArticleComponent.vue'
import Article from '@/components/articleComponent.vue'
import Skeleton from '@/components/SkeletonComponent.vue'
import { storeToRefs } from 'pinia'
import { articleState } from '@/store';

document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;

const articleStateObj = articleState()

const { articleList } = storeToRefs(articleStateObj)

</script>
<style lang="less">
.article {
  padding-bottom: 1rem;
  border-bottom: 1px solid #7f8c8d;

  &:last-child {
    border: none;
  }
}
</style>
