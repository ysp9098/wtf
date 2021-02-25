
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/page/Home'
import Video from '@/page/Video'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'/',
            component:Home
        },{
            path:'/mv',
            component:Video,
            name:'video'
        }
    ]
})