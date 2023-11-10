import { defineStore } from 'pinia';
import { ITableHeader } from '@/interfaces/ITableHeader';

export const useStore = defineStore('index-store', {
    state: () => ({
        tableUniqueLabels: new Set<string>(),
    }),

    actions: {
        updateTableUniqueLabelsState(uniqLabels: Set<string>) {
            this.tableUniqueLabels = uniqLabels;
        }
    },

    getters: {
        getUniqueHeaderTitles(): ITableHeader[] {
            return Array.from(this.tableUniqueLabels);
        },
    }
});
