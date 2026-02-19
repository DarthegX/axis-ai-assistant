export const Storage = {
    save: (key: string, data: any) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.error("Error guardando en localStorage", error);
            }
        }
    },

    get: <T>(key: string): T | null => {
        if (typeof window !== 'undefined') {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error("Error leyendo localStorage", error);
                return null;
            }
        }
        return null;
    },

    remove: (key: string) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    },

    clear: () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }
};