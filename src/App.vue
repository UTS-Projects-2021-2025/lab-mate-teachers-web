<script lang="ts" setup>
import HeaderNav from '@components/nav/header-nav.vue';
</script>

<template>
    <header-nav />

    <p>Current route: {{ $route.fullPath }}</p>

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
