import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@pages/home-page.vue';
import LoginPage from '@pages/login-page.vue';
import AccountPage from '@pages/account-page.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/account', component: AccountPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
