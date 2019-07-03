<template>
    <div id="app">
        <app-nav></app-nav>
        <app-main></app-main>
    </div>
</template>
<script>

</script>
<style lang="css">
    * {
        box-sizing: border-box;
    }
    #app {
        display: flex;
    }
    aside {
        display: none;
        width: 200px;
        background: #cecece;
        height: 100vh;
    }
    aside.active {
        display: block;
    }
    aside a {
        display: block;
        padding: 10px 5px;
        color: #666;
        border-bottom: 1px solid #bbb;
    }
    .wrapper {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        width: 100vw;
    }
    header {
        width: 100%;
        padding: 10px;
        background: #aaa;
    }
    main {
        flex-grow: 2;
        padding: 10px;
    }
</style>
