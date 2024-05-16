import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Session } from '@supabase/supabase-js';

import { supabase } from '@/supabase-client';

export type AccountType = {
    id: string;
    updatedAt: number;
    username: string;
    fullName: string;
    avatarUrl: string;
};

export type SessionUserType = {
    id: string;
    username: string;
    fullName: string;
};

export const intoSessionUser = ({
    presence_ref,
    username,
    fullName,
}: any): SessionUserType => {
    return {
        id: presence_ref,
        username,
        fullName,
    };
};

export const useAccountStore = defineStore('account', () => {
    const session = ref<Session | null>(null);
    const account = ref<AccountType | null>(null);

    const username = ref('');
    const fullName = ref('');
    const avatarUrl = ref('');
    const email = computed(() => session.value?.user?.email || '');

    const isLoading = ref(false);
    const isAuthenticated = computed(() => session.value !== null);

    const loadSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error(error);
            return;
        }

        session.value = data.session;

        supabase.auth.onAuthStateChange((_, _session) => {
            session.value = _session;
        });
    };

    const fetchAccount = async () => {
        try {
            isLoading.value = true;
            const { user } = session.value!;

            const { data, error, status } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user?.id)
                .single();

            console.log(`user id: ${user?.id}`);
            console.log(data);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                account.value = {
                    id: data.id,
                    updatedAt: data.updated_at,
                    username: data.username,
                    fullName: data.full_name,
                    avatarUrl: data.avatar_url,
                };
                username.value = account.value.username;
                fullName.value = account.value.fullName;
                avatarUrl.value = account.value.avatarUrl;
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            isLoading.value = false;
        }
    };

    const updateAccount = async () => {
        try {
            isLoading.value = true;
            const { user } = session.value!;

            console.log(account.value);
            console.log(`username: ${username.value}`);
            console.log(`full name: ${fullName.value}`);
            console.log(`avatar url: ${avatarUrl.value}`);

            const { error } = await supabase.from('profiles').upsert({
                id: user?.id,
                username: username.value,
                full_name: fullName.value,
                avatar_url: avatarUrl.value,
                updated_at: new Date(),
            });

            if (error) {
                throw error;
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            isLoading.value = false;
        }
    };

    const signOut = async () => {
        try {
            isLoading.value = true;
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isAuthenticated,
        account,
        session,
        email,
        username,
        fullName,
        avatarUrl,
        loadSession,
        fetchAccount,
        updateAccount,
        signOut,
        isLoading,
    };
});
