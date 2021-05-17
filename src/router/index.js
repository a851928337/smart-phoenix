import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '@/assets/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index'),
    meta: {
      title: '户列表',
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/record',
        name: 'visit-record',
        component: () => import('@/views/visit-record'),
        meta: {
          title: '走访记录',
        },
      },
      {
        path: '/record/:id',
        name: 'visit-record-detail',
        component: () => import('@/views/visit-record-detail'),
        meta: {
          title: '走访详情',
        },
      },
      {
        path: '/record/submit/:id',
        name: 'record-submit',
        component: () => import('@/views/record-submit'),
        meta: {
          title: '填写走访',
        },
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const length = store.routeList.length;
  console.log([...store.routeList]);
  let action = '';
  if (length < 2) {
    action = 'forward';
  } else {
    const lastRoute = store.routeList[length - 2];
    if (lastRoute.name === to.name) {
      action = 'back';
    } else {
      action = 'forward';
    }
  }
  if (action === 'forward') {
    store.routeList.push({
      name: to.name,
      path: to.path,
      title: to.meta.title,
    });
  } else {
    store.routeList.splice(length - 1, 1);
  }
  next();
});

export default router;
