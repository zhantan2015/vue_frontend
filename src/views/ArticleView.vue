<template>
    <!-- <Article :article="article" :full="true"></Article> -->
    <div class="comments__area">
        <h2>七嘴八舌</h2>
        <div class="comment__blank comment_item" v-if="commentStateObj.commentList.length == 0">
            <p>
                这里居然没吵起来？！在下面开始你的引战吧！
            </p>
        </div>
        <Comment class="comment_item" @submit-reply-comment="submitComment" @reply-comment="replyComment"
            v-for="comment in commentStateObj.commentList" :key="comment.cid" :comment="comment">
        </Comment>
        <div class="reply__outer" v-if="showReply">
            <h2>下面我说两点</h2>
            <Reply @submit="submitComment"></Reply>
        </div>
    </div>
</template>
<script setup>

import useNotification from '@/hooks/useNotification';

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { articleState, commentState } from '@/store';
import { storeToRefs } from 'pinia'

import request from '@/assets/js/requests'
// import Article from '../components/ArticleComponent.vue'
import Reply from '@/components/ReplyComponent.vue'
import Comment from '@/components/CommentComponent.vue'

document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;

const router = useRoute()
const articleStateObj = articleState()
const commentStateObj = commentState()
const { authorInfo } = storeToRefs(commentStateObj)

const article = articleStateObj.getArticleByAid(router.params['aid'])
console.log(article)
commentStateObj.getCommentListByAid(article['aid'])

let showReply = ref(true)

const notification = useNotification()

async function submitComment(commentInfo) {
    commentInfo.aid = article.aid
    let res = await request.post('/comment', commentInfo)
    notification[res.type](res.message)
    authorInfo.value.content = ''
    delete authorInfo.value.rpid
    commentStateObj.getCommentListByAid(article.aid)
}
function replyComment(value) {
    showReply.value = value
}

</script>
<style scoped lang="less">
.continue_reading {
    display: none;
}

.comments__area {
    margin-top: 1rem;
    margin-bottom: 2rem;

    h2 {
        padding-top: 1rem;
        border-top: .2rem solid #7f8c8d;
        padding: 1rem 0 2rem;
        font-size: 1.2rem;
    }
}

.comment__blank {
    text-align: left;
    padding: 1rem .8rem;
}

.comment_item {
    padding: .8rem 0;
    border-bottom: 1px #3d3d3d66 solid;
}

.reply__outer {
    margin-top: 3rem;
}

.sub_comment {
    margin-left: 2rem;
}
</style>