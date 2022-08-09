import { defineStore } from 'pinia'
import request from '@/assets/js/requests'

function formatDT(time) {
    var d = time ? new Date(time) : new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var min = d.getMinutes();
    var seconds = d.getSeconds();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hours < 0) hours = '0' + hours;
    if (min < 10) min = '0' + min;
    if (seconds < 10) seconds = '0' + seconds;

    return (year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds);
}
// 参数1：容器ID，必须唯一；
// 参数2：Options对象
export const mainState = defineStore('main', {
    // data：必须是箭头函数，为了ts类型推导
    // persist: true,
    state: () => ({
        dark: eval(localStorage['dark']),
        notificationInfo: {
            active: false,
            type: 'info',
            message: '一条提示信息'
        }
    }),
    getters: {},
    actions: {
        activeNotification(option) {
            this.notificationInfo.type = option.type || 'info'
            this.notificationInfo.message = option.message
            this.notificationInfo.active = true
            const timeout = option.timeout || 1600
            setTimeout(() => this.notificationInfo.active = false, timeout)
        }
    }
})
export const articleState = defineStore('article', {
    // persist: true,
    state: () => ({
        articleList: []
    }),
    getters: {
    },
    actions: {
        async getArticleList() {
            let res = await request.get('/article')
            this.articleList = res.data.map(i => {
                i.create_date = formatDT(i.create_date);
                i.category = i.category || '未分类'

                if (i.content.length <= 100) {
                    i.comput_content = i.content
                }
                else {
                    let str = i.content
                    i.comput_content = str.slice(0, str.indexOf('</p>'))
                }
                return i
            }).reverse()
        },
        getArticleByAid(aid) {
            return this.articleList.filter(i => i.aid == aid)[0]
        }
    }
})
export const commentState = defineStore('comment', {
    // persist: true,
    state: () => ({
        commentList: [],
        replyId: '',
        authorInfo: {
            author: '',
            content: '',
            email: '',
            website: ''
        },
        leaveMessageList: [],
    }),
    getters: {
    },
    actions: {
        async getCommentListByAid(aid) {
            let res = await request.get('/comment/' + aid)
            this.commentList = res.data.map(i => {
                i.create_date = formatDT(i.create_date)
                return i
            })
        },
        setReplyId(value) {
            this.replyId = value
        },
        getCommentListByRpid(rpid) {
            return this.rpCommentList.filter(i => i.rpid == rpid)
        },
        async getLeaveMessageList() {
            let res = await request.get('/leave-message')
            this.leaveMessageList = res.data.map(i => {
                i.cid = i.lmid
                i.create_date = formatDT(i.create_date)
                return i
            })
        }
    }
})