<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { supabase } from '@/supabase-client';

const router = useRouter();

const loading = ref(false);
const err = ref<string | null>(null);

const email = ref('');

const login = async () => {
    loading.value = true;
    err.value = null;

    const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
    });

    if (error) {
        err.value = error.message;
    }

    loading.value = false;
    router.push('/check-email');
};
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center mb-4">Login</h5>
                        <form @submit.prevent="login">
                            <div class="mb-2">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="email" type="email" class="form-control" id="email"
                                    placeholder="Enter your email" />
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="loading">
                                Login
                            </button>
                            <p v-if="err" class="text-danger mt-2">{{ err }}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    color: var(--bs-body-bg);
    background-color: var(--bs-body-color);
}
</style>
