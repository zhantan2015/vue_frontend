<template>
  <div class="about">
    <article id="post-186" class="post-186 page type-page status-publish hentry">
      <header>
        <h1>About Me</h1>
      </header>
      <main>
        <p>这个博客最早是我在高中暑假的某个午后一时兴起开始捣鼓的，那时候她还只是一个纯静态网站。</p>
        <p>后面开始学会用PHP去实现一些简单的动态功能。</p>
        <p>又后来，学了Python，了解到了web框架，便又用Django重新实现了大部分页面。也开始引入MySQL管理后台数据。</p>
        <p>再后来，看到有些人的网站居然不用刷新就能跳转页面。一番查找后又了解到了SPA和前端框架以及前后端分离的架构。</p>
        <p>在对前端框架的学习中我对模块化和工程化有了更深刻的理解，也让我的 JavaScript 和 Typescript 水平有了极大提升。</p>
        <p>于是我着手用vue3和express一步步改写她。</p>
        <p>在经过了无数个闲极无聊或是忙里偷闲的日子后，她变成了现在这个样子。</p>
        <p>从那个午后的一时兴起开始再到如今，这个博客的历程像极了web技术的变迁历程——从简单的静态页面，到后端动态生成HTML文档，再到前后端分离。</p>
        <p>若有以后，这艘忒修斯之船的下一个港口可能会是 docker 和 web3.0</p>
        <p style="text-align: right;">2022-07-18</p>
      </main>
      <footer>
        <h2>联系我</h2>
        <div class="email">
          <h3>Email
          </h3>
          <div class="bash">
            <span class="function">echo </span>
            <span class="plain">emhhbnRhbjIwMTVAZ21haWwuY29tCg== | </span>
            <span class="function">base64 </span>
            <span class="plain">-d</span>
          </div>
        </div>
        <div class="wechat">
          <h3>WeChat</h3>
          <img src="../assets/img/WeChat.jpg" alt="" srcset="">
        </div>
      </footer>
    </article>
  </div>
</template>
<script setup>
</script>
<style scoped lang="less">
.about {
  text-align: left;
  padding: 2rem 1.8rem 5rem;
}

footer {
  .email {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    h3 {
      display: inline-block;
      margin-right: .6rem;
    }

    .bash {
      padding: .3rem .5rem;
      background-color: #0f192a;

      span {
        font-family: Monaco, "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace;
        font-size: 1rem;
      }

      .function {
        color: #ffaa3e;
      }

      .plain {
        color: #cfc8be;
      }
    }
  }

  .wechat {
    img {
      width: 6rem;
    }
  }

}
</style>
