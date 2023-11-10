<template>
    <div class="instruments-panel-sort">
        <span>Sort By:</span>
        <InstrumentsList
            checkbox-list-label="Sort By"
            :items="tableUniqueLabelsStore.getUniqueHeaderTitles"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import InstrumentsList from '@/components/InstrumentsList.vue';
    import { useTableUniqueLabelsStore } from '@/store';

    export default defineComponent({
        name: 'InstrumentsPanelSort',
        components: {
            InstrumentsList,
        },

        data: () => ({
            tableUniqueLabelsStore: useTableUniqueLabelsStore(),
        }),
    });
</script>
