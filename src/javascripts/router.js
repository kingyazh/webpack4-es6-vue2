import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件

// import login from './../components/login.vue'
import home from './../components/home.vue'
import notFound from './../components/404.vue'
import menutab from './../components/menu/menuTab.vue'
import menutable from './../components/menu/menuTable.vue'

import VisaInfoForm from './../components/VisaInfoForm.vue'
import List from './../components/List.vue'

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// this router test
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
//  this router test End

export default new VueRouter({
    routes: [
        {path: '/pageA', component: pageA, name: 'page A'},
        {path: '/pageB', component: pageB, name: 'page B'},
        {path: '/foo', component: Foo, name: 'page Foo'},
        {path: '/bar', component: Bar, name: 'page Bar'},

        // {
        //     path: '/login',
        //     component: login,
        //     name: '',
        //     hidden: true
        // },
        {
            path: '/404',
            component: notFound,
            name: '',
            hidden: true
        },
        {
            path: '/',
            component: home,
            name: '导航一',
            iconCls: 'el-icon-message', //图标样式class
            children: [{
                path: '/menutab',
                component: menutab,
                name: 'Tab'
            }]
        },
        {
            path: '/',
            component: home,
            name: '导航二',
            iconCls: 'fa fa-id-card-o',
            children: [{
                path: '/menutable',
                component: menutable,
                name: 'Table'
            }
            ]
        },


        {path: '/', redirect: '/index'},   // 跳转路由，默认显示路由页面
        {
            path: '/List',
            component: List
        },
        {
            path: '/VisaInfo/:countryId/:id',
            component: VisaInfoForm
        }
    ],
    'linkActiveClass':'active'  //为路由匹配激活link-active，方便设置类

});
