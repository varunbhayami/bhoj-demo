import Vue from 'vue';
import Router from 'vue-router'
import Home from '../Pages/Home/home'
import Register from '../Pages/Register/register'
import Login from '../Pages/Login/login'

import VueCarousel from 'vue-carousel'
import * as VueGoogleMaps from '../../node_modules/vue2-google-maps'

Vue.use(Router);

Vue.use(VueCarousel)

Vue.use(VueGoogleMaps, {
    load: {
        key: '',
        libraries: 'places'
    }
})

const router = new Router({
    mode: 'history',
    base: process.env.ROUTER_PREFIX,
    routes: [
        {path: '/', component: Home, name: 'home'},
        {path: '/register', name: 'register', component: Register, props: true},
        {path: '/login', component: Login, name: 'login'}
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

export default router;
