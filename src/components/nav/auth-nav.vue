<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useAccountStore } from '@data/account.ts';

const store = useAccountStore();

const { isAuthenticated } = storeToRefs(store);
</script>

<template>
    <div class="d-flex">
        <div v-if="isAuthenticated">
            <router-link to="/account">
                Profile
            </router-link>
        </div>
        <router-link v-else to="/login" class="btn btn-primary">
            Login
        </router-link>
    </div>
</template>

<style scoped></style>
