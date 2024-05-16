import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@pages/home-page.vue';
import LoginPage from '@pages/login-page.vue';
import AccountPage from '@pages/account-page.vue';
import CheckEmailPage from '@pages/check-email-page.vue';
import ClassroomPage from '@pages/classroom-page.vue';
import CreateActivityPage from '@pages/create-activity-page.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/account', component: AccountPage },
    { path: '/check-email', component: CheckEmailPage },
    { path: '/classroom/:classroomId', component: ClassroomPage, props: true },
    {
        path: '/classroom/:classroomId/create-activity',
        component: CreateActivityPage,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
