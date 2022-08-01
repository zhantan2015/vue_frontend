<template>
    <article>
        <header>
            <div class="avatar">
                <svg t="1658478818451" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2209" width="200" height="200">
                    <path
                        d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m-292.544-232.064s585.088 0 585.088 1.472V637.696C804.544 553.856 609.536 512 512 512c-97.536 0-292.544 41.92-292.544 125.696v154.24zM512 438.848a146.304 146.304 0 1 0 0-292.544 146.304 146.304 0 0 0 0 292.544z"
                        p-id="2210"></path>
                </svg>
            </div>
            <span class="author_info">
                <span class="author" v-text="comment.author"></span>
                <time v-text="comment.create_date"></time>
            </span>
        </header>
        <main class="comment_content" v-text="comment.content">
        </main>
        <footer>
            <div class="reply" @click="replyComment">
                <span v-text="commentStateObj.replyId == comment.cid ? '取消' : '回复'"></span>
            </div>
            <div v-if="commentStateObj.replyId == comment.cid" class="subReply">
                <Reply @submit="submitReplyComment" :rpText="rpText"></Reply>
            </div>
        </footer>
    </article>
</template>
<script setup>
import { reactive, toRefs, computed } from "vue";
import Reply from '@/components/ReplyComponent.vue'
import { commentState } from '@/store'


const emit = defineEmits(['replyComment', 'submitReplyComment'])
const props = defineProps(['comment'])
const comment = props['comment']
const commentStateObj = commentState()

const rpText = computed(() => {
    return `Re:${comment.author} - 
`
})

function replyComment() {
    if (commentStateObj.replyId != comment.cid) {
        commentStateObj.replyId = comment.cid
        emit('replyComment', false)
    }
    else {
        commentStateObj.replyId = ''
        emit('replyComment', true)
    }
}

function submitReplyComment(value) {
    value.rpid = comment.cid
    emit('submitReplyComment', value)
    setTimeout(()=>{replyComment()},800)
}

const data = reactive({
    commentInfo: {
        content: '内容',
        author: 'zhantan',
        published: '2022-7-22'
    }
})

const { commentInfo } = { ...toRefs(data) }
</script>
<style scoped lang="less">
article {
    text-align: left;
    margin-bottom: .8rem;
}

header {
    display: flex;
}

.avatar {
    display: flex;
    align-items: center;
    margin-bottom: .6rem;

    svg {
        width: 2.2rem;
        height: 2.2rem;
        margin-right: .8rem;
    }
}

body.dark {
    .avatar {
        svg {
            fill: #eee;
        }
    }
}

.author_info {
    display: flex;
    flex-direction: column;

    time {
        color: #686868;
        font-family: Montserrat, "Helvetica Neue", sans-serif;
        font-size: 0.8125rem;
        line-height: 1.6153846154;
    }
}


.reply {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    svg {
        width: 1.3rem;
        height: 1.3rem;
    }

    span {
        font-size: .6rem;
        margin-left: .2rem;
        display: block;
        padding: 3px;
        border: 1px solid #686868;
        border-radius: 3px;
    }
}

body.dark {
    .reply {
        svg {
            fill: aliceblue;
        }
    }
}

.comment_info {
    display: flex;
    flex-direction: column;
}

main {
    margin: .8rem;
}

.subReply {
    margin-top: .6rem;
    padding-left: .8rem;
    padding-bottom: 1rem;
}
</style>