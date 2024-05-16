<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';

import { supabase } from '@/supabase-client';

type PageProps = {
    classroomId: string;
};

const { classroomId } = defineProps<PageProps>();

const router = useRouter();

const name = ref<string>('');
const description = ref<string>('');
const startTime = ref<string>('');
const duration = ref<number>(0);

const isLoading = ref<boolean>(false);
const err = ref<string | null>(null);

const placeholder = computed(() => (isLoading.value ? 'placeholder' : ''));

const submit = async () => {
    try {
        isLoading.value = true;
        err.value = null;

        if (duration.value <= 0) {
            throw new Error('Duration must be greater than 0');
        } else if (name.value === '') {
            throw new Error('Name cannot be empty');
        } else if (description.value === '') {
            throw new Error('Description cannot be empty');
        }

        const startTimeValue =
            startTime.value === '' ? new Date() : new Date(startTime.value);

        const start_time = new Date(startTimeValue).toISOString();
        const end_time = new Date(
            new Date(startTimeValue).getTime() + duration.value * 60000,
        ).toISOString();

        const payload = {
            classroom_id: classroomId,
            name: name.value,
            description: description.value,
            start_time,
            end_time,
        };
        console.log('Payload:', payload);

        const { error } = await supabase.from('activities').insert(payload);

        if (error) {
            throw error;
        }
    } catch (error: any) {
        err.value = 'An error occurred while creating activity.';
        console.error('Error creating activity:', error.message);
    } finally {
        isLoading.value = false;

        if (!err.value) {
            router.push(`/classroom/${classroomId}`);
        }
    }
};

/*
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
*/
</script>

<template>
    <div class="container mt-4">
        <div class="container-fluid d-flex">
            <div class="mb-2">
                <h1>Create a new activity</h1>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="submit">
                            <div class="form-floating mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="activityName"
                                    placeholder="Tuesday Question 01"
                                    v-model="name"
                                />
                                <label for="activityName" class="form-label"
                                    >Name</label
                                >
                            </div>

                            <div class="form-floating mb-3">
                                <textarea
                                    class="form-control"
                                    id="activityDescription"
                                    placeholder="Prove that P=NP"
                                    v-model="description"
                                ></textarea>
                                <label
                                    for="activityDescription"
                                    class="form-label"
                                    >Description</label
                                >
                            </div>

                            <div class="form-floating mb-3">
                                <input
                                    type="datetime-local"
                                    class="form-control"
                                    id="activityStartTime"
                                    placeholder="start time"
                                    v-model="startTime"
                                />
                                <label
                                    for="activityStartTime"
                                    class="form-label"
                                    >Start Time (leave blank to use time
                                    now)</label
                                >
                            </div>

                            <div class="form-floating mb-3">
                                <input
                                    type="number"
                                    class="form-control"
                                    id="activityDuration"
                                    placeholder="duration"
                                    v-model="duration"
                                />
                                <label for="activityDuration" class="form-label"
                                    >Duration (in minutes)</label
                                >
                            </div>
                            <button
                                type="submit"
                                :class="placeholder"
                                class="btn btn-primary"
                            >
                                Create Activity
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
#activityDescription {
    height: 16rem;
}
</style>
