<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { supabase } from '@/supabase-client';

type lab = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    location: string;
};

const labs: lab[] = [
    {
        id: '1',
        name: 'Physics Lab',
        startTime: '9:00 AM',
        endTime: '11:00 AM',
        location: 'Room 101',
    },
    {
        id: '2',
        name: 'Chemistry Lab',
        startTime: '1:00 PM',
        endTime: '3:00 PM',
        location: 'Room 102',
    },
    {
        id: '3',
        name: 'Biology Lab',
        startTime: '3:00 PM',
        endTime: '5:00 PM',
        location: 'Room 103',
    },
];
const labRef = ref<lab[]>(labs);

const className = ref<string>('');
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

const subjects = ref<lab[]>([]);

const fetchSubjects = async () => {
    const { data: subjects, error } = await supabase
        .from('subjects')
        .select('*');
    if (error) {
        console.error('Error fetching labs:', error.message);
    } else {
        console.log(`subjects ${subjects}`);
        labRef.value = subjects;
    }
};

onMounted(() => {
    fetchSubjects();
});
</script>

<template>
    <div class="container mt-4">
        <h2>Classrooms</h2>

        <!-- Form to add a new class -->
        <div class="container-fluid mb-4">
            <h4>Create Classroom</h4>

            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="">
                                <div class="mb-2">
                                    <label for="className" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="className" placeholder="Enter class name."
                                        v-model="className" />
                                </div>

                                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                    Create
                                </button>
                                <p v-if="error" class="text-danger mt-2">{{ error }}</p>
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
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="subject in subjects" :key="subject.id">
                        <td>{{ subject.name }}</td>
                        <td>{{ subject.startTime }}</td>
                        <td>{{ subject.endTime }}</td>
                        <td>{{ subject.location }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
