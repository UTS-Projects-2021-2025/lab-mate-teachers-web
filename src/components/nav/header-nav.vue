<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToLogin = () => {
    router.push('/login');
};
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

                <!-- Navbar links -->
                <div
                    class="collapse navbar-collapse justify-content-center"
                    id="navbarNav"
                >
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link
                                to="/"
                                class="nav-link active"
                                aria-current="page"
                            >
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Teachers</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Students</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Login/Signup Button on the right -->
            <div class="d-flex">
                <button
                    class="btn btn-primary"
                    type="button"
                    @click="navigateToLogin"
                >
                    Login
                </button>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
