<template>
    <form class="comment_form">
        <label for="comment">评论<span>*</span></label>
        <textarea v-model="authorInfo.content" name="comment" id="comment" cols="45" rows="10"></textarea>
        <div class="input_div">
            <label for="author">称呼<span>*</span></label>
            <input v-model="authorInfo.author" type="text" id="author" name="author">
        </div>
        <div class="input_div">
            <label for="email">e-mail</label>
            <input v-model="authorInfo.email" type="email" id="email" name="email">
        </div>
        <div class="input_div">
            <label for="website">个人页面</label>
            <input v-model="authorInfo.website" type="text" id="website" name="website">
        </div>
        <div class="submit_div">
            <span class="message">{{ message }}</span>
            <span class="submit" @click="submit">提交评论</span>
        </div>
    </form>
</template>
<script setup>
import { reactive, toRefs } from 'vue';
import { commentState } from '@/store'
import { storeToRefs } from 'pinia'

import useNotification from '@/hooks/useNotification'
const notification = { ...useNotification() }

const emit = defineEmits(['submit'])
const props = defineProps(['rpText'])

const commentStateObj = commentState()
const { authorInfo } = storeToRefs(commentStateObj)
let rpText = props['rpText']
authorInfo.value.content = rpText || ''

const data = reactive({
    message: '',
})

function submit() {
    let commentInfo = authorInfo.value
    if (commentInfo.content.replaceAll(' ', '') == '' ||
        commentInfo.author.replaceAll(' ', '') == '')
        return notification.info('带 * 的项目为必填项！')
    if (commentInfo.content.length > 500)
        return message.value = '评论最长为500字'
    emit('submit', commentInfo)
}

const { message } = { ...toRefs(data) }


</script>
<style scoped lang="less">
.comment_form {
    width: 100%;
    text-align: left;
}

label {
    display: block;
    margin-bottom: .2rem;

    span {
        margin: 0 .1rem;
        color: red !important;
    }
}

input,
textarea {
    max-width: 100%;
    min-width: 100%;
    min-height: 2rem;
    border-radius: 3px;
    border-style: none;
    display: block;
    padding: 0 .2rem;
    font-size: 1rem;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;

}

input {
    height: 2rem;
}

textarea {
    padding: .2rem;
}

.input_div {
    width: 100%;
    margin: .8rem 0;
}

.submit_div {
    margin-top: 2rem;
}

.message {
    display: block;
    margin-bottom: 1.8rem;
}

.submit {
    margin-top: 1.8rem;
    padding: 0.88rem;
    border-radius: .3rem;
    cursor: pointer;
    background-color: #015958;
    color: #bdc3c7;

    &:hover {
        color: #2c3e50;
        background-color: #008F8C;
    }

}

body.dark {
    .submit {
        background-color: #015958;
        color: #cfc8be;
    }

    .submit:hover {
        background-color: #008f8c;
        color: #2c3e50;
    }
}
</style>