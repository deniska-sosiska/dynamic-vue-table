<template>
    <div class="instruments-panel-filter">
        <span>Filter By:</span>
        <InstrumentsList
            checkbox-list-label="Include"
            :header-items="store.getUniqueHeaderTitles"
            :is-filter-instrument="true"
            @update-instrument-rules="extendFilterRules('include', $event)"
        >
            <template #existing-rules>
                <PrettyFilterRule :rules="store.filterRules.include" filter-type="include" />
            </template>
        </InstrumentsList>

        <InstrumentsList
            checkbox-list-label="Exclude"
            :header-items="store.getUniqueHeaderTitles"
            :is-filter-instrument="true"
            @update-instrument-rules="extendFilterRules('exclude', $event)"
        >
            <template #existing-rules>
                <PrettyFilterRule :rules="store.filterRules.exclude" filter-type="exclude" />
            </template>
        </InstrumentsList>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from '@/store';
    import InstrumentsList from '@/components/InstrumentsList.vue';
    import { IFilterRuleValue, IFiltersRuleRecordsKey } from '@/interfaces/IFilterRules';
    import PrettyFilterRule from '@/components/PrettyFilterRule.vue';

    export default defineComponent({
        name: 'InstrumentsPanelFilter',
        components: {
            InstrumentsList,
            PrettyFilterRule,
        },

        data: () => ({
            store: useStore(),
        }),

        methods: {
            extendFilterRules(key: IFiltersRuleRecordsKey, newFilterRuleRecord: IFilterRuleValue) {
                this.store.extendFilterRules(key, newFilterRuleRecord);
            },
        },
    });
</script>
