import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const pageA = resolve => {
    require.ensure(['../views/pageA.vue'], () => {
        resolve(require('../views/pageA.vue'));
    });
}
const pageB = resolve => {
    require.ensure(['../views/pageB.vue'], () => {
        resolve(require('../views/pageB.vue'));
    });
}
export default new VueRouter({
    routes: [
        { path: '/pageA', component: pageA,name:'page A' },
        { path: '/pageB', component: pageB,name:'page B' },
        { path: '/foo', component: Foo,name:'page Foo' },
        { path: '/bar', component: Bar,name:'page Bar' },
        {path: '/',redirect: '/index'},   // 跳转路由，默认显示路由页面

    ],
    'linkActiveClass':'active'  //为路由匹配激活link-active，方便设置类

});
