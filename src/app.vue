<template>
    <div id="app">
        <CommHeader></CommHeader>
        <Breadcrumb></Breadcrumb>
        <transition name="router-fade">
            <router-view></router-view>
        </transition>
        <CommFooter></CommFooter>
    </div>
</template>

<script>
    import CommHeader from './components/header/header'
    import CommFooter from './components/fooder/footer'
    import Breadcrumb from './components/breadcrumb'
    export default {
        name: 'App',
        components: {
            CommHeader,
            CommFooter,
            Breadcrumb
        }
    }
</script>

<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>
