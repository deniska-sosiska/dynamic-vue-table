import { defineStore } from 'pinia';
import { ITableHeader } from '@/interfaces/ITableHeader';
import { ISortRule } from '@/interfaces/ISortRule';
import { IFiltersRuleRecordsKey, IFiltersRuleRecords, IFilterRuleValue } from '@/interfaces/IFilterRules';

export const useStore = defineStore('index-store', {
    state: () => ({
        tableUniqueLabels: new Set<string>(),
        sortRules: [] as ISortRule[],
        filterRules: {
            include: [],
            exclude: [],
        } as IFiltersRuleRecords,
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

            copySortRules.sort((a, b) =>
                dictionaryTableLabelsByOriginOrder.get(a)! - dictionaryTableLabelsByOriginOrder.get(b)!,
            );

            this.sortRules = copySortRules;
        },

        extendFilterRules(filterType: IFiltersRuleRecordsKey, rules: IFilterRuleValue) {
            this.filterRules[filterType].push(rules);
        },

        removeFilterRule(filterType: IFiltersRuleRecordsKey, index: number) {
            this.filterRules[filterType].splice(index, 1);
        },
    },

    getters: {
        getUniqueHeaderTitles(): ITableHeader[] {
            return Array.from(this.tableUniqueLabels);
        },
    }
});
