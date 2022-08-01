<template>
    <div class="editor_outter">
        <div class="input-group">
            <input type="text" id="title" v-model="articleInfo.title">
        </div>
        <Editor :init="init" v-model="articleInfo.content"></Editor>
        <div class="input-group">
            <label for="tags">标签</label>
            <input type="text" id="tags" v-model="tags">
        </div>
        <div class="input-group">
            <label for="categroy">分类</label>
            <select name="categroy" id="categroy" v-model="articleInfo.acid" @click="flushCategroyList">
                <option value="">未分类</option>
                <option :value="item.acid" v-for="item in categories" :key="item.acid" v-text="item.acname">
                </option>
            </select>
        </div>
        <div class="input-group">
            <label for="new_categroy">新建分类</label>
            <input name="new_categroy" id="new_categroy" v-model="new_category_name">
            <a href="javascript:;" id="new_categroy_a" @click="postCategory">
                <svg t="1658320721573" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3005" width="200" height="200">
                    <path
                        d="M512 936.915619c-234.672764 0-424.915619-190.243879-424.915619-424.915619S277.327236 87.083357 512 87.083357c234.676857 0 424.916643 190.243879 424.916643 424.915619S746.676857 936.915619 512 936.915619zM724.45781 469.50414 554.491767 469.50414 554.491767 299.546284l-84.983533 0 0 169.957857L299.54219 469.50414l0 84.99172 169.966043 0 0 169.966043 84.983533 0L554.491767 554.49586l169.966043 0L724.45781 469.50414z"
                        p-id="3006"></path>
                </svg>
            </a>
        </div>
        <div class="preview" v-html="articleInfo.content">
        </div>
        <div class="input-group">
            <span class="submit" @click="postArticle">提交</span>
        </div>
    </div>
</template>
<script>
import { reactive, ref, computed, toRefs } from 'vue';
import request from '../assets/js/requests';
import router from '@/router';
import { StatusCode } from '@/assets/js/common/apiResult'
//引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue';
export default {
    name: 'EditArticleView',
    components: {
        Editor
    },

    setup() {
        if (!localStorage['token'])
            router.push('/login')
        else
            request.put('/auth', {})
                .then(res => {
                    if (res.code == StatusCode.failed) {
                        localStorage.removeItem('token')
                        router.push('/login')
                    }
                })

        const init = {
            branding: false,
            resize: false,
            menubar: true,
            skin: 'oxide-dark',
            menu: {
                file: { title: '文件', items: 'newdocument' },
                edit: { title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall' },
                insert: { title: '插入', items: 'link media | template hr' },
                view: { title: '查看', items: 'visualaid fullscreen' },
                format: { title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
                table: { title: '表格', items: 'inserttable tableprops deletetable | cell row column' },
                tools: { title: '工具', items: 'spellchecker code' }
            },
            toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
            // toolbar_drawer: "sliding",
            quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
            plugins: "link image media table lists fullscreen quickbars",
            // language: 'zh_CN', //本地化设置
            height: 350
        }

        let tags = ref('')
        let comput_tags = computed(() =>
            // 按；号切割后去重再取前三个值
            [...new Set(tags.value.replaceAll(' ', '')
                .replaceAll('；', ';')
                .split(';')
                .filter(i => {
                    return !!i
                }))].slice(0, 3)
        )

        let data = reactive({
            articleInfo: {
                title: '', content: '', acid: '', tags: comput_tags
            },
            new_category_name: '',
            categories: []
        })

        async function postCategory() {
            let acname = data.new_category_name;
            if (!acname) return
            await request.post('/category', { acname })
            data.new_category_name = ''
        }

        function flushCategroyList() {
            request.get('/category').then(res => {
                data.categories = res.data
            })
        }

        function postArticle() {

            let postData = {
                ...data.articleInfo
            }

            if (postData.title == '' || postData.content == '') {
                return
            }

            request.post('/article', postData).then(res => {
                console.log(res)
                tags.value = ''
                data.articleInfo = {
                    title: '', content: '', acid: '', tags: comput_tags
                }
            })
        }

        return {
            init, tags, comput_tags,
            ...toRefs(data),
            postCategory, flushCategroyList, postArticle
        }
    }
}
</script>
<style scoped lang="less">
.editor_outter {
    text-align: left;
}

#new_categroy_a {
    display: inline-flex;
    svg {
        width: 2rem;
        height: 2rem;
        fill: #008F8C;
    }
}

.preview {
    height: 2%;
    overflow-y: auto;
}
</style>