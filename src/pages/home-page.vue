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
        <h2>Classes</h2>

        <div class="container-fluid mb-2">
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

        <div class="container-fluid mb-2">
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
                    <tr v-for="lab in labRef" :key="lab.id">
                        <td>{{ lab.name }}</td>
                        <td>{{ lab.startTime }}</td>
                        <td>{{ lab.endTime }}</td>
                        <td>{{ lab.location }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Form to add a new class -->
        <div class="container-fluid">
            <h4>Add New Class</h4>
            <form>
                <div class="mb-3">
                    <label for="className" class="form-label">Class Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="className"
                        placeholder="Enter class name"
                    />
                </div>
                <div class="mb-3">
                    <label for="classTime" class="form-label">Time</label>
                    <input
                        type="text"
                        class="form-control"
                        id="classTime"
                        placeholder="Enter class time"
                    />
                </div>
                <div class="mb-3">
                    <label for="classRoom" class="form-label">Room</label>
                    <input
                        type="text"
                        class="form-control"
                        id="classRoom"
                        placeholder="Enter room number"
                    />
                </div>
                <button type="submit" class="btn btn-primary">Add Class</button>
            </form>
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
