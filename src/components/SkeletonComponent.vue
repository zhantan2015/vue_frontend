<template>

    <div class="skeleton__outer">
        <div class="skeleton">
            <header>
            </header>
            <main>
                <div class="text" v-for="i in [1, 2, 3, 4]" :key="i"></div>
            </main>
            <footer>
                <div class="f1"></div>
                <div class="f2"></div>
                <div class="f3"></div>
            </footer>
        </div>
        <div class="skeleton">
            <header>
            </header>
            <main>
                <div class="text" v-for="i in [1, 2, 3, 4]" :key="i"></div>
            </main>
            <footer>
                <div class="f1"></div>
                <div class="f2"></div>
                <div class="f3"></div>
            </footer>
        </div>
        <div class="skeleton">
            <header>
            </header>
            <main>
                <div class="text" v-for="i in [1, 2, 3, 4]" :key="i"></div>
            </main>
            <footer>
                <div class="f1"></div>
                <div class="f2"></div>
                <div class="f3"></div>
            </footer>
        </div>
    </div>

</template>
<script setup>

</script>
<style lang="less" scoped>
body.dark {
    --zt-color-start: #aaa;
    --zt-color-end: #bbb;
}


@keyframes skeleton_running {
    0% {
        background: var(--zt-color-start);
    }

    40% {
        background: var(--zt-color-end);
    }

    80% {
        background: var(--zt-color-start);
    }

    100% {
        background: var(--zt-color-start);
    }
}


header,
main .text,
footer .f1,
footer .f2,
footer .f3 {
    animation: 2s skeleton_running infinite cubic-bezier(0.36, 0, 0.64, 1);
}

.skeleton {
    // height: 320px;
    margin-bottom: 1rem;
    border-bottom: 1px solid #aaa;

    --zt-color-start: #ffffff1f;
    --zt-color-end: #ffffff2e;
}

body.dark {
    .skeleton {
        border-bottom: 1px solid #ffffff1f;
    }

}


header,
main .text,
footer .f1,
footer .f2,
footer .f3 {
    background-color: #ddd;
}


header {
    height: 38px;
    width: 33%;

    border-radius: 3px;

    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
}

main {
    .text {
        height: 28px;
        margin-bottom: .3rem;
        border-radius: 3px;

        &:last-child {
            width: 68%;
        }
    }
}

footer {
    display: flex;
    margin: 2rem 0 1rem;

    .f1,
    .f2,
    .f3 {
        height: 21px;
        display: inline-block;
        margin-right: 1rem;
        border-radius: 3px;
    }

    .f1 {
        width: 140px;
    }

    .f2 {
        width: 72px
    }

    .f3 {
        width: 76px
    }
}
</style>