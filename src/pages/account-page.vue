<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountStore } from '@data/account.ts';

const store = useAccountStore();

// const loading = ref(false);
const { fetchAccount, updateAccount, signOut } = store;
const { email, username, fullName, isLoading } = storeToRefs(store);
const err = ref<string | null>(null);

onMounted(() => {
    fetchAccount();
});
</script>


<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center mb-3">Account Profile</h5>
                        <form @submit.prevent="updateAccount">
                            <div>
                                <div class="mb-4">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter your email"
                                        :value="email" disabled />
                                </div>
                                <div class="mb-4">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="username" placeholder="Enter your user name"
                                        v-model="username" />
                                </div>
                                <div class="mb-4">
                                    <label for="fullname" class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="fullname" placeholder="Enter your full name"
                                        v-model="fullName" />
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                Submit
                            </button>

                            <button type="button" class="btn btn-danger m-2" @submit.prevent="signOut">Log Out</button>
                            <p v-if="err" class="text-danger mt-2">{{ err }}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
