<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { RealtimeChannel } from '@supabase/supabase-js';

import { supabase } from '@/supabase-client';
import { formatDate } from '../utils/dates';
import type { ClassroomType } from '@data/classrooms';
import type { ActivityType } from '@/data/activities';
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

const createActivityLink = computed(
    () => `/classroom/${classroomId}/create-activity`,
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

const activities = ref<ActivityType[]>([]);

const fetchActivities = async () => {
    const { data, error } = await supabase
        .from('activities')
        .select('id,created_at,name,description,start_time,end_time')
        .eq('classroom_id', classroomId)
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data.map((activity) => ({
        id: activity.id,
        createdAt: Date.parse(activity.created_at),
        name: activity.name,
        description: activity.description,
        startTime: Date.parse(activity.start_time),
        endTime: Date.parse(activity.end_time),
    }));
};

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

        activities.value = await fetchActivities();

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
});
</script>

<template>
    <div class="container mt-4">
        <div class="container-fluid d-flex justify-content-between">
            <div class="mb-2">
                <h1>Classroom</h1>
                <h4 v-if="classroom">{{ headerText }}</h4>
            </div>
            <div>
                <router-link :to="createActivityLink" class="btn btn-primary"
                    >Create Activity</router-link
                >
            </div>
        </div>

        <hr />

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

        <hr />

        <div class="container-fluid mb-4">
            <h4>List Activities</h4>

            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="activity in activities" :key="activity.id">
                        <td>{{ activity.name }}</td>
                        <td>
                            {{ formatDate(activity.startTime) }}
                        </td>
                        <td>{{ formatDate(activity.endTime) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
