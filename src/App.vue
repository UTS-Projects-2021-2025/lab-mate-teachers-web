<script lang="ts" setup>
import { onMounted } from 'vue';

import { useAccountStore } from '@data/account.ts';
import HeaderNav from '@components/nav/header-nav.vue';

const { loadSession } = useAccountStore();

onMounted(() => {
    loadSession();
})
</script>

<template>
    <header-nav />

    <main>
        <router-view />
    </main>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
