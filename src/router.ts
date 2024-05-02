import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@pages/home-page.vue';
import LoginPage from '@pages/login-page.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
