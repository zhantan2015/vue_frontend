<template>
    <div class="editor_outter">
        <h1>{{ articleInfo.title }}</h1>
        <p>{{ articleInfo.content }}</p>
        <ul>
            <li v-for="tag in articleInfo.tags" :key="new Date().getTime">{{ tag }}</li>
        </ul>
        <input type="text" v-model="tags">
        <br>
        <br>
        <br>
        <a href="javascript:;" @click="reset">重置</a>
    </div>
</template>
<script>
import { reactive, ref, computed, toRefs } from 'vue';
export default {
    name: 'test',

    setup() {

        let tags = ref('')

        let c_tags = computed(() =>
            [...new Set(tags.value.replaceAll(' ', '')
                .replaceAll('；', ';')
                .split(';')
                .filter(i => {
                    return !!i
                }))].slice(0, 3)
        )

        let data = reactive({
            articleInfo: {
                title: 'ttt',
                content: 'ccc',
                tags: c_tags
            }
        })

        function reset() {
            tags.value = ''
            data.articleInfo = {
                title: '',
                content: '',
                tags: c_tags
            }
            console.log(data)
        }

        return {
            tags, ...toRefs(data), reset
        }
    }
}
</script>
<style scoped lang="less">
.editor_outter {
    text-align: left;
}
</style>