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

export default {
  setup() {

    if (localStorage['token'])
      router.push('/edit-article')

    const password = computed(() =>
      sha256(tpwd.value)
    );
    const userinfo = reactive({ username: "", password });

    async function login() {
      if (!userinfo.username || !userinfo.password) return
      await request.post('auth', userinfo)
      router.push('/edit-article')
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