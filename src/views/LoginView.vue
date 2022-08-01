<template>
    <div class="login__outer">
        <div class="input-group">
            <input type="text" placeholder="用户名" v-model="userinfo.username">
        </div>
        <div class="input-group">
            <input type="passwod" placeholder="密码" v-model="tpwd">
        </div>
        <div class="input-group">
            <span class="submit" @click="login">提交</span>
        </div>
    </div>
</template>
<script>
import { reactive, ref, computed } from 'vue'
import { sha256 } from 'js-sha256'
import request from '@/assets/js/requests'
import router from '@/router'
import { mainState } from '@/store'

export default {
    setup() {

        const mainStateObj = mainState()

        if (localStorage['token'])
            router.push('/')

        const password = computed(() =>
            sha256(tpwd.value)
        );
        const userinfo = reactive({ username: "", password });

        async function login() {
            if (!userinfo.username || !userinfo.password) return
            const res = await request.post('auth', userinfo)
            mainStateObj.activeNotification(res)
            userinfo.username = ''
            tpwd.value = ''
            if (res.type == 'success')
                router.push('/')
        }
        let tpwd = ref("")

        return {
            userinfo, tpwd, password, login
        }

    }
}
</script>
<style scoped lang="less">
</style>