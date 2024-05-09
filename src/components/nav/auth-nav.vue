<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const isAuthenticated = ref(false);

onMounted(() => {
    isAuthenticated.value = false;
})
</script>

<template>
    <!-- Login/Signup Button on the right -->
    <div class="d-flex">
        <router-link v-if="isAuthenticated" to="/login" class="btn btn-primary">
            Login
        </router-link>
        <div v-else>
            <router-link to="/account">
                Profile
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
