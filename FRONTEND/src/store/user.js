import {create} from 'zustand'

export const useUserStore = create(set => ({
    users: [],
    setUsers: (users) => set({users}),
    fetchUsers: async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        set({products: data.data})
    }
}))