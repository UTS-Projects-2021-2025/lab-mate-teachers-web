<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { RealtimeChannel } from '@supabase/supabase-js';

import { supabase } from '@/supabase-client';
import type { ClassroomType } from '@data/classrooms';
import { SessionUserType, intoSessionUser } from '@data/account';

type pageProps = {
    classroomId: string;
};

const { classroomId } = defineProps<pageProps>();

const classroom = ref<ClassroomType | null>(null);
const headerText = computed(() =>
    classroom.value
        ? `${classroom.value.name} with code: ${classroom.value.code}`
        : '',
);

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

const students = ref<SessionUserType[]>(studentList);

const fetchClassroom = async () => {
    const { data, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', classroomId)
        .single();

    if (error) {
        throw error;
    }

    const classroomData: ClassroomType = {
        id: data?.id,
        code: data?.code,
        name: data?.name,
        updatedAt: Date.parse(data?.created_at),
    };
    return classroomData;
};

const subscribeToPresence = () => {
    if (!channel.value) {
        throw new Error('Channel not initialised');
    }

    channel.value
        .on('presence', { event: 'join' }, ({ newPresences }) => {
            newPresences.forEach((presence) => {
                console.log('User joined:', presence);

                students.value.push(intoSessionUser(presence));
            });
        })
        .on('presence', { event: 'leave' }, ({ leftPresences }) => {
            leftPresences.forEach((presence) => {
                console.log('User left:', presence);

                students.value = students.value.filter(
                    (student) => student.id !== presence.presence_ref,
                );
            });
        })
        .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                if (!channel.value) {
                    throw new Error('Channel not initialised');
                }
                await channel.value.track({
                    online_at: new Date().toISOString(),
                });
                console.log('Connected to presence channel');
            }
        });
};

const asyncInit = async () => {
    try {
        isLoading.value = true;

        classroom.value = await fetchClassroom();
        console.log(`Joining classroom code: ${classroom.value.code}`);

        channel.value = supabase.channel(classroom.value.code);
        subscribeToPresence();
    } catch (error: any) {
        console.error('Error initilising data:', error.message);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    asyncInit();
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
            <div class="row text-center">
                <div
                    v-for="student in students"
                    :key="student.id"
                    class="col-4"
                >
                    <p>{{ student.fullName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
