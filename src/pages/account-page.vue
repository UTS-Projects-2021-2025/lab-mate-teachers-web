<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center mb-4">Account Profile</h5>
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

<script lang="ts" setup>
import { ref } from 'vue';
import { supabase } from '@supabase';

const loading = ref(false);
const username = ref('');
const avatar_url = ref('');
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
