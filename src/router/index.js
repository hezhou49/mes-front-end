import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Index from '../views/index/Index'
import Order from '../views/Order'
import Equipment from '../views/equip/Equipment'
import Quality from '../views/Quality'
import Warnning from '../views/Warnning'
import Environment from '../views/Environment'
import Product from '../views/Product'
import Safemanagement from '../views/SafeManagement'
import System from '../views/System'
import Agv from'../views/Agv'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
          {
              path: '/index',
              name: 'Index',
              component: Index
          },
          {
              path: '/order',
              name: 'Order',
              component: Order
          },
          {
              path: '/product',
              name: 'Product',
              component: Product
          },
          {
              path: '/equipment',
              name: 'Equipment',
              component: Equipment
          },
          {
              path: '/warnning',
              name: 'Warnning',
              component: Warnning
          },
          {
              path: '/quality',
              name: 'Quality',
              component: Quality
          },
          {
              path: '/safemanagement',
              name: 'Safemanagement',
              component: Safemanagement
          },
          {
              path: '/environment',
              name: 'Environment',
              component: Environment
          },
          {
              path: '/system',
              name: 'System',
              component: System
          }
          ,
          {
              path: '/agv',
              name: 'Agv',
              component: Agv
          }

      ],
      meta:{
          isLogin:true
      }
  },

];

const router = new VueRouter({
  routes
});
router.beforeEach((to,from,next)=>{
    if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
        if (sessionStorage['user']) {
            next();
        }else{
            next({
                path:"/",
                query:{
                    redirect:to.fullPath
                }
            });
        }

    }else{
        next()
    }
});
export default router
