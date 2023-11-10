<template>
    <div class="instruments-panel-sort">
        <span>Sort By:</span>
        <InstrumentsList
            checkbox-list-label="Sort By"
            :header-items="store.getUniqueHeaderTitles"
            @update-checked-list="updateResultCheckedList"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from '@/store';
    import InstrumentsList from '@/components/InstrumentsList.vue';
    import { ITableHeader } from '@/interfaces/ITableHeader';

    export default defineComponent({
        name: 'InstrumentsPanelSort',
        components: {
            InstrumentsList,
        },

        data: () => ({
            store: useStore(),
        }),

        methods: {
            updateResultCheckedList(result: ITableHeader[]) {
                this.store.updateSortRules(result);
            },
        },
    });
</script>
