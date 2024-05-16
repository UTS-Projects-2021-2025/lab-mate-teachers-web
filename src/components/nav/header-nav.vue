<script lang="ts" setup>
import authNav from './auth-nav.vue';
</script>

<template>
    <header class="container-fluid">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <!-- Logo and title -->
                <router-link to="/" class="navbar-brand">
                    <img
                        src=""
                        alt=""
                        width="30"
                        height="24"
                        class="d-inline-block align-text-top"
                    />
                    Lab Rat
                </router-link>

                <!-- Toggler button for mobile view -->
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <!-- Login/Signup Button on the right -->
            <auth-nav />
        </nav>
    </header>
</template>

<style scoped></style>
