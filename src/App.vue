<template>
  <div class="app__outer theme" :class="{ dark: dark }">
    <div class="app__inner theme" :class="{ dark: dark }">
      <header class="site-header">
        <div class="title">
          <h1>川之上</h1>
          <h3>子在川上曰 逝者如斯夫 不舍昼夜</h3>
        </div>
        <input type="checkbox" name="menu-cbox" id="menu-cbox">
        <label class="menu-btn" :class="{ dark: dark }" for="menu-cbox" @click="menuActive = !menuActive">
          <div class="menu-border">
            <div id="menu-1"></div>
            <div id="menu-2"></div>
            <div id="menu-3"></div>
          </div>
        </label>
      </header>
      <nav v-show="menuActive">
        <router-link to="/">首页</router-link>
        <router-link to="/leave-a-message">留言板</router-link>
        <router-link to="/about-me">关于我</router-link>
        <router-link to="/edit-article">写文章</router-link>
      </nav>
      <main>
        <router-view />
      </main>
      <div class="theme-toggle theme" @click="toggle_theme" :class="{ dark: dark }">
        <svg class=" sun" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M512 832a64 64 0 0 1 64 64v64a64 64 0 1 1-128 0v-64a64 64 0 0 1 64-64z m0-640a64 64 0 0 1-64-64V64a64 64 0 1 1 128 0v64a64 64 0 0 1-64 64z m448 256a64 64 0 1 1 0 128h-64a64 64 0 1 1 0-128h64zM192 512a64 64 0 0 1-64 64H64a64 64 0 1 1 0-128h64a64 64 0 0 1 64 64z m636.768 226.272l45.248 45.248a64 64 0 1 1-90.496 90.496l-45.248-45.248a64 64 0 1 1 90.496-90.496zM195.232 285.728L149.984 240.48a64 64 0 1 1 90.496-90.496l45.248 45.248a64 64 0 1 1-90.496 90.496z m633.536 0a64 64 0 1 1-90.496-90.496l45.248-45.248a64 64 0 1 1 90.496 90.496l-45.248 45.248zM195.232 738.272a64 64 0 1 1 90.496 90.496l-45.248 45.248a64 64 0 1 1-90.496-90.496l45.248-45.248zM512 256a256 256 0 1 0 0 512 256 256 0 0 0 0-512z m0 416a160 160 0 1 1 0.032-320.032A160 160 0 0 1 512 672z" />
        </svg>
        <svg class="moon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M524.8 938.666667h-4.266667a439.893333 439.893333 0 0 1-313.173333-134.4 446.293333 446.293333 0 0 1-11.093333-597.333334 432.213333 432.213333 0 0 1 170.666666-116.906666 42.666667 42.666667 0 0 1 45.226667 9.386666 42.666667 42.666667 0 0 1 10.24 42.666667 358.4 358.4 0 0 0 82.773333 375.893333 361.386667 361.386667 0 0 0 376.746667 82.773334 42.666667 42.666667 0 0 1 54.186667 55.04A433.493333 433.493333 0 0 1 836.266667 810.666667a438.613333 438.613333 0 0 1-311.466667 128z" />
        </svg>
        <div class="mask"></div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/style.less'
import { ref } from 'vue'

export default {
  setup() {
    let menuActive = ref(false)


    function toggle_theme() {
      if (dark.value) document.body.classList.remove('dark')
      else document.body.classList.add('dark')
      dark.value = !dark.value
      localStorage['dark'] = dark.value
    }
    function flushCache() {
      if (!localStorage['token'])
        router.push('/login')
      else
        requests.put('/auth', {})
          .then(res => {
            if (res.code == StatusCode.failed) {
              localStorage.removeItem('token')
              router.push('/login')
            } else {
              requests.get('/flush-cache').then(res => console.log(res))
            }
          })
    }

    return { router, menuActive, dark, toggle_theme, flushCache, notificationInfo }
  }
}

</script>

<style lang="less">
#app {
  font-family: Montserrat, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eff0f1;
  .app__inner {
    height: calc(100vh - 2 * var(--outer-padding));
    overflow-y: auto;
    padding: 0 4vw;
    box-sizing: border-box;
    background-color: #eff0f1;
    &.dark {
      background-color: #2b2d2e;
      & * {
        transition-property: color;
        color: #cfc8be;
      }
      & input,
      & select {
        background-color: #7f8c8d;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .site-header {
    text-align: left;
    // padding: 2rem 4rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      flex-grow: 1;
      h3 {
        font-family: Georgia, serif;
        color: #7f8c8d;
        font-size: 1.1rem;
      }
    }
    .menu-btn {
      cursor: pointer;
      .menu-border {
        width: 32px;
        height: 32px;
        border: solid 1px #3d3d3d;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        padding: 2px 3px;
        #menu-1,
        #menu-2,
        #menu-3 {
          height: 4px;
          width: 28px;
          border-radius: 3px;
          background-color: #3d3d3d;
          transition: 0.2s all ease-in-out;
        }
      }
      &.dark {
        .menu-border {
          border-color: #cfc8be;
          #menu-1,
          #menu-2,
          #menu-3 {
            background-color: #cfc8be;
          }
        }
      }
    }
    #menu-cbox {
      display: none;
    }
    #menu-cbox:checked~.menu-btn {
      #menu-2 {
        transform: translateX(-100%);
        opacity: 0;
      }
      #menu-1 {
        // transform: rotate(45deg);
        transform: translateY(9px) rotate(45deg);
      }
      #menu-3 {
        // transform: rotate(45deg);
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
  nav {
    font-family: "Microsoft YaHei", Montserrat, "Helvetica Neue", sans-serif;
    display: flex;
    flex-direction: column;
    text-align: left;
    // padding: 0 4rem;
    a {
      display: block;
      padding: 0.8rem 0;
      outline: none;
      text-decoration: none;
      color: #3d3d3d;
      font-weight: 200;
      border-top: 1px solid #3d3d3d33;
      &:last-child {
        border-bottom: 1px solid #3d3d3d33;
      }
      &:active {
        font-weight: 500;
        color: #2b2d2e;
      }
    }
  }
  main {
    margin-top: 2rem;
    // padding: 0 4rem;
  }
  .theme-toggle {
    --tt-p: 6px;
    --tt-item-w: 1.3rem;
    cursor: pointer;
    position: fixed;
    right: 2.6rem;
    bottom: 2.6rem;
    height: calc(var(--tt-item-w) + var(--tt-p) * 2);
    width: calc(var(--tt-item-w) * 2 + var(--tt-p) * 3);
    border-radius: 1.5rem;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #2c3e50;
    .sun,
    .moon,
    .mask {
      width: var(--tt-item-w);
      height: var(--tt-item-w);
    }
    .sun,
    .moon {
      fill: #eff0f1;
    }
    .mask {
      position: absolute;
      width: calc(var(--tt-item-w) + var(--tt-p) / 2);
      height: calc(var(--tt-item-w) + var(--tt-p) / 2);
      background-color: #eff0f1;
      border-radius: 50%;
      left: calc(var(--tt-p) / 2);
      transition: all .2s ease-in;
    }
  }
  .theme-toggle.dark {
    background-color: #39393D;
    .mask {
      left: calc(var(--tt-item-w) + var(--tt-p) * 2);
      background-color: #7f8c8d;
    }
  }
}
</style>
