// import './styles/common.scss';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';


import router from './javascripts/router';

// import App from './App.vue';

Vue.config.debug = true;//开启错误提示

new Vue({
    el: '#app',
    router,
    // template: '<App/>',
    // components: { App }
});

Vue.use(VueLazyload,{
    preLoad: 1.3,
    //loading: './static/img/loading.gif',  //static 目录下的文件要用绝对地址引用 /static/[filename]
    attempt: 1,
    listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
});
