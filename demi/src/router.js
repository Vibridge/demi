import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './libs/http';


Vue.use(Router);
/* eslint-disable */

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: {title: 'login'},
            // component:resolve => require(['@/views/login/index.vue'], resolve),
            component:()=> import('./views/login/index.vue')
        },

        {path:'/', redirect:'login'},

        {
            path: '/B_reg',
            name: 'B_reg',
            meta: {title: 'B_reg'},
            component: () => import('./views/B_reg/index.vue')
            // component:resolve => require(['@/views/B_reg/index.vue'], resolve),

        },
        {
            path: '/B_index',
            name: 'B_index',
            redirect: '/B_index/B_person',
            meta: {title: 'B_index'},
            component: () => import( './views/B_index/index.vue'),
            children:[
                {
                    path: '/B_index/B_person',
                    name: 'B_person',
                    meta: {title: 'index',parent:'B_person'},
                    component: () => import('./views/B_index/B_person.vue'),
                    // component:resolve => require(['@/views/B_index/B_person.vue'], resolve),

                },
                {
                    path: '/B_index/B_person/work',
                    name: 'work',
                    meta: {title: 'work',parent:'B_person'},
                    component: () => import('./views/B_index/work/index.vue')
                    // component:resolve => require(['@/views/B_index/work/index.vue'], resolve),

                },
                {
                    path: '/B_index/B_person/interview',
                    name: 'interview',
                    meta: {title: 'interview',parent:'B_person'},
                    component: () => import('./views/B_index/interview/index.vue')
                    // component:resolve => require(['@/views/B_index/interview/index.vue'], resolve),

                },
                {
                    path: '/B_index/B_person/task',
                    name: 'task',
                    meta: {title: 'task',parent:'B_person'},
                    component: () => import('./views/B_index/task/index.vue')
                    // component:resolve => require(['@/views/B_index/task/index.vue'], resolve),

                },
                {
                    path: '/B_index/B_person/order',
                    name: 'order',
                    meta: {title: 'order',parent:'B_person'},
                    component: () => import('./views/B_index/order/index.vue')
                    // component:resolve => require(['@/views/B_index/order/index.vue'], resolve),
                },
                {
                    path: '/B_index/B_person/collect',
                    name: 'collect',
                    meta: {title: 'collect',parent:'B_person'},
                    component: () => import('./views/B_index/collect/index.vue')
                    // component:resolve => require(['@/views/B_index/collect/index.vue'], resolve),
                },
                {
                    path: '/B_index/B_person/wallet',
                    name: 'wallet',
                    meta: {title: 'wallet',parent:'B_person'},
                    component: () => import('./views/B_index/wallet/index.vue')

                },
                {
                    path: '/B_index/B_person/real',
                    name: 'real',
                    meta: {title: 'real',parent:'B_person'},
                    component: () => import('./views/B_index/real/index.vue')
                },
                {
                    path: '/B_index/B_person/VIP',
                    name: 'VIP',
                    meta: {title: 'VIP',parent:'B_person'},
                    component: () => import('./views/B_index/VIP/index.vue')

                },
                {
                    path: '/B_index/B_person/company_info',
                    name: 'company_info',
                    meta: {title: 'company_info',parent:'B_person'},
                    component: () => import('./views/company_detail/index.vue')
                },
                {
                    path: '/B_index/B_person/create/work',
                    name: 'create_work',
                    meta: {title: 'create_work',parent:'create'},
                    component: () => import('./views/create/work_create/work.vue')
                },
                {
                    path: '/B_index/B_person/create/task',
                    name: 'create_task',
                    meta: {title: 'create_task',parent:'create'},
                    component: () => import('./views/create/task_create/index.vue')
                },
                {
                    path: '/B_index/B_person/withdraw',
                    name: 'withdraw',
                    meta: {title: 'create_work',parent:'withdraw'},
                    component: () => import('./views/withdraw/index.vue')
                },
                {
                    path: '/B_index/work_resume',
                    name: 'work_resume',
                    meta: {title: 'work_resume',parent:'resume'},
                    component: () => import('./views/work_resume/index')
                },
                {
                    path: '/B_index/ability_resume',
                    name: 'ability_resume',
                    meta: {title: 'ability_resume',parent:'resume'},
                    component: () => import('./views/ability_resume/index')
                },
                {
                    path: '/B_index/IM',
                    name: 'IM',
                    meta: {title: 'IM',parent:'im'},
                    component: () => import('./views/IM/index')
                },
                {
                    path: '/B_index/Detail',
                    name: 'App',
                    meta: {title: 'App',parent:'detail'},
                    component: () => import('./views/app_detail/index')
                },
            ],
        },




    ],
});
router.beforeEach((to, from, next) => {
    const LOGIN_PAGE_NAME = 'login';
    const token = getToken();
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        next({ name:LOGIN_PAGE_NAME });
    } else {
        next();
    }
});

/*router.afterEach((to,from) => {
    document.getElementsByClassName('B_index_wrapper')[0].scrollTo(0,0);
});*/


export default router;
