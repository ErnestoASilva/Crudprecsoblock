import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('userStore', () => {

    // Estados
    const isAuthenticated = ref(false);
    const userType = ref(null);

    // Acciones
    const login = (_userType) => {
        localStorage.setItem('userType', _userType);
        isAuthenticated.value = true;
        userType.value = _userType;
    };

    const logout = () => {
        localStorage.removeItem('userType');
        isAuthenticated.value = false;
        userType.value = null;
    };

    // Getter
    const userGet = computed(() => {
        return {
            isAuthenticated: isAuthenticated.value,
            userType: userType.value
        };
    });

    return { isAuthenticated, userType, logout, login, userGet };
});
