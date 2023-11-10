import { defineStore } from 'pinia';
import { ITableHeader } from '@/interfaces/ITableHeader';
import { ISortRule } from '@/interfaces/ISortRule';
import { IFilterRuleKey, IFilterRules, IFilterRuleValue } from '@/interfaces/IFilterRules';

export const useStore = defineStore('index-store', {
    state: () => ({
        tableUniqueLabels: new Set<string>(),
        sortRules: [] as ISortRule[],
        filterRules: {
            include: [],
            exclude: [],
        } as IFilterRules,
    }),

    actions: {
        updateTableUniqueLabelsState(uniqLabels: Set<string>) {
            this.tableUniqueLabels = uniqLabels;
        },

        updateSortRules(newSortRules: ISortRule[]) {
            const copySortRules = [...newSortRules];
            const dictionaryTableLabelsByOriginOrder = new Map(
                this.getUniqueHeaderTitles.map((i, index) => [i, index]),
            );

            copySortRules.sort((a, b) => {
                const orderA = dictionaryTableLabelsByOriginOrder.get(a)!;
                const orderB = dictionaryTableLabelsByOriginOrder.get(b)!;

                if (orderA > orderB) { return 1; }
                if (orderA < orderB) { return -1; }
                return 0;
            });

            this.sortRules = copySortRules;
        },

        updateFilterRules(label: IFilterRuleKey, value: IFilterRuleValue[]) {
            //
        }
    },

    getters: {
        getUniqueHeaderTitles(): ITableHeader[] {
            return Array.from(this.tableUniqueLabels);
        },
    }
});
