<template>
  <div class="leave-a-message">
    <div class="comments__area">
      <h2>涂鸦墙</h2>
      <div class="comment__blank comment_item" v-if="leaveMessageList.length == 0">
        <p>
          寻寻觅觅冷冷清清凄凄惨惨戚戚
        </p>
      </div>
      <Comment class="comment_item" @submit-reply-comment="submitComment" @reply-comment="replyComment"
        v-for="comment in leaveMessageList" :key="comment.cid" :comment="comment">
      </Comment>
      <div class="reply__outer" v-if="showReply">
        <h2>下面我说两点</h2>
        <Reply @submit="submitComment"></Reply>
      </div>
    </div>
  </div>
</template>
<script setup>
import useNotification from '@/hooks/useNotification';

import { ref } from 'vue';
import { commentState } from '@/store';
import { storeToRefs } from 'pinia'

import request from '@/assets/js/requests'
import Reply from '@/components/ReplyComponent.vue'
import Comment from '@/components/CommentComponent.vue'

const commentStateObj = commentState()
const { authorInfo } = storeToRefs(commentStateObj)
commentStateObj.getLeaveMessageList()
const { leaveMessageList } = { ...storeToRefs(commentStateObj) }

let showReply = ref(true)

const notification = useNotification()

async function submitComment(commentInfo) {
  commentInfo = { ...commentInfo }
  let res = await request.post('/leave-message', commentInfo)
  notification[res.type](res.message)
  authorInfo.value.content = ''
  delete authorInfo.value.rpid
  commentStateObj.getLeaveMessageList()
}

function replyComment(value) {
  showReply.value = value
}
</script>
<style scoped lang="less">
.leave-a-message {
  margin-bottom: 3rem;
}

h2 {
  padding: 1rem 0 2rem;
}

.comment_item {
  border-bottom: 1px #3d3d3d66 solid;
  padding: .8rem 0;
}

.comment_item:first-child {
  border-top: 1px #3d3d3d66 solid;
}
</style>
