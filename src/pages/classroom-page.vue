<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { RealtimeChannel } from '@supabase/supabase-js';

import { supabase } from '@/supabase-client';
import type { classroom } from '@data/classrooms';

type studentSession = {
    id: string;
    username: string;
    fullName: string;
};

type pageProps = {
    classroomId: string;
};

const { classroomId } = defineProps<pageProps>();

const classroom = ref<classroom | null>(null);
const headerText = computed(() => classroom.value ? `${classroom.value.name} with code: ${classroom.value.code}` : '');

const channel = ref<RealtimeChannel | null>(null);

const isLoading = ref<boolean>(false);

const studentList = [
    {
        id: '1',
        username: 'johndoe',
        fullName: 'John Doe',
    },
    {
        id: '2',
        username: 'janedoe',
        fullName: 'Jane Doe',
    },
    {
        id: '3',
        username: 'johndoejr',
        fullName: 'John Doe Jr.',
    },
];

const students = ref<studentSession[]>(studentList);

const fetchClassroom = async () => {
    try {
        isLoading.value = true;
        const { data, error } = await supabase.from('classrooms').select('*').eq('id', classroomId).single();

        if (error) {
            throw error;
        }

        classroom.value = {
            id: data?.id,
            code: data?.code,
            name: data?.name,
            updatedAt: Date.parse(data?.created_at),
        }
    } catch (error: any) {
        console.error('Error fetching classroom:', error.message);
    } finally {
        isLoading.value = false;
    }
}

const asyncInit = async () => {
    try {
        isLoading.value = true;

        //const 

    } catch (error: any) {
        console.error('Error initilising data:', error.message);
    } finally {
        isLoading.value = false;
    }

};

onMounted(() => {
    //fetchClassroom();
});
</script>

<template>
    <div class="container mt-4">
        <div class="container-fluid d-flex">
            <div class="mb-2">
                <h1>Classroom</h1>
                <h4 v-if="classroom">{{ headerText }}</h4>
            </div>
            <div>
                <button class="btn btn-primary">Create Activity</button>
            </div>
        </div>

        <p v-if="isLoading">Loading...</p>

        <div v-else-if="classroom" class="container-fluid">
            <h4>Students In Class</h4>
            <div class="grid text-center">
                <div v-for="student in students" :key="student.id" class="g-col-4">
                    <p>{{ student.fullName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
