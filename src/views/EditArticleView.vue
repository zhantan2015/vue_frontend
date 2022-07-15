<template>
    <div class="editor_outter">
        <div class="input-group">
            <label for="title">标题</label>
            <input type="text" id="title">
        </div>
    </div>
</template>
<script>
export default {
    name: 'EditArticleView',
    setup() {

    }
}
</script>
<style scoped lang="less">
.input-group {
    width: 100%;
    display: flex;
    height: 32px;
    justify-items: center;
    align-items: center;

    label {
        font-size: 1.1rem;
    }

    input {
        border-style: none;
        flex-grow: 1;
        margin-left: .8rem;
        padding-left: .6rem;
        font-size: 1.1rem;
        border-radius: 3px;
        height: 100%;
        outline: none;
    }
}
</style>