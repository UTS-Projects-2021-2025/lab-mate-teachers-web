<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { FeTrash2 } from '@kalimahapps/vue-icons';

import { supabase } from '@/supabase-client';
import { useAccountStore } from '@data/account';
import type { classroom } from '@data/classrooms';

const authStore = useAccountStore();
const { isAuthenticated } = storeToRefs(authStore);

const className = ref<string>('');
const isLoading = ref<boolean>(false);
const err = ref<string | null>(null);

const classrooms = ref<classroom[]>([]);

const dateFormatter = (date: number) => {
    const d = new Date(date);

    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

const createClassroom = async () => {
    try {
        isLoading.value = true;
        const { error } = await supabase.from('classrooms').insert([
            {
                name: className.value,
            },
        ]);

        if (error) {
            err.value = error.message;
            throw error;
        } else {
            err.value = null;
            className.value = '';
        }

        await fetchClassrooms();
    } catch (error: any) {
        console.error('Error creating classroom:', error.message);

        err.value = err.value || 'An error occurred while creating classroom.';
    } finally {
        isLoading.value = false;
    }
};

const fetchClassrooms = async () => {
    try {
        const { data, error } = await supabase.from('classrooms').select('*');

        if (error) {
            throw error;
        }

        console.log(`classroom data ${data}`);
        console.log(data);

        classrooms.value = data.map((classroom) => ({
            id: classroom.id,
            code: classroom.code,
            name: classroom.name,
            updatedAt: Date.parse(classroom.updated_at),
        }));
    } catch (error: any) {
        console.error('Error fetching classrooms:', error.message);
    } finally {
        console.log(`classrooms ${classrooms}`);
    }
};

const deleteClassroom = async (id: string) => {
    try {
        const { error } = await supabase.from('classrooms').delete().eq('id', id);

        if (error) {
            throw error;
        }

        await fetchClassrooms();
    } catch (error: any) {
        console.error('Error deleting classroom:', error.message);
    }
};

onMounted(() => {
    fetchClassrooms();
});
</script>

<template>
    <div v-if="isAuthenticated" class="container mt-4">
        <h2>Classrooms</h2>

        <!-- Form to add a new class -->
        <div class="container-fluid mb-4">
            <h4>Create Classroom</h4>

            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="createClassroom">
                                <div class="mb-2">
                                    <label for="className" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="className" placeholder="Enter class name."
                                        v-model="className" />
                                </div>

                                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                    Create
                                </button>
                                <p v-if="err" class="text-danger mt-2">
                                    {{ err }}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid mb-4">
            <h4>List Classrooms</h4>

            <table class="table">
                <thead>
                    <tr>
                        <th>Lab Name</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Updated At</th>
                        <th>Navigate To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="classroom in classrooms" :key="classroom.id">
                        <td>{{ classroom.name }}</td>
                        <td>{{ classroom.code }}</td>
                        <td>{{ classroom.name }}</td>
                        <td>
                            {{ dateFormatter(classroom.updatedAt) }}
                        </td>
                        <td>
                            <router-link :to="`/classroom/${classroom.id}`" class="link">
                                {{ `Link to ${classroom.name}` }}
                            </router-link>
                        </td>
                        <td>
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-danger" @click="deleteClassroom(classroom.id)"><fe-trash-2 /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="container mt-4" v-else>
        <h1>Welcome to Class Mate</h1>
        <p>Please login to continue</p>
        <router-link to="/login">
            <button class="btn btn-primary">Login</button>
        </router-link>
    </div>
</template>

<style scoped>
/* Add your styles here */
.home {
    text-align: center;
    margin-top: 50px;
}

button {
    margin: 0 10px;
}
</style>
