<script lang="ts" setup></script>

<template>
    <header class="container-fluid">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <!-- Logo and title -->
                <a class="navbar-brand" href="#">
                    <img
                        src=""
                        alt=""
                        width="30"
                        height="24"
                        class="d-inline-block align-text-top"
                    />
                    Lab Rat
                </a>

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
                            <a
                                class="nav-link active"
                                aria-current="page"
                                href="#"
                                >Teachers</a
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Students</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Login/Signup Button on the right -->
            <div class="d-flex">
                <button class="btn" type="button">Login</button>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
