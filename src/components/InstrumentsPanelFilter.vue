<template>
    <div class="instruments-panel-filter">
        <span>Filter By:</span>
        <InstrumentsList
            checkbox-list-label="Include"
            :header-items="store.getUniqueHeaderTitles"
            :is-filter-instrument="true"
            @update-checked-list="updateIncludeCheckedList"
        />
        <InstrumentsList
            checkbox-list-label="Exclude"
            :header-items="store.getUniqueHeaderTitles"
            :is-filter-instrument="true"
            @update-checked-list="updateExcludeCheckedList"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from '@/store';
    import InstrumentsList from '@/components/InstrumentsList.vue';
    import { IFilterRuleValue } from '@/interfaces/IFilterRules';

    export default defineComponent({
        name: 'InstrumentsPanelFilter',
        components: {
            InstrumentsList,
        },

        data: () => ({
            store: useStore(),
            includeLabelList: [] as IFilterRuleValue[],
            excludeLabelList: [] as IFilterRuleValue[],
        }),

        // store.getUniqueHeaderTitles

        mounted() {
            this.excludeLabelList = this.store.getUniqueHeaderTitles;
            this.includeLabelList = this.store.getUniqueHeaderTitles;
        },

        methods: {
            // onClick() {
            //     // this.store.updateFilterRules('key', 'value');
            // },

            updateIncludeCheckedList(items: IFilterRuleValue[]) {

            },

            updateExcludeCheckedList(items: IFilterRuleValue[]) {

            },
        },
    });
</script>
