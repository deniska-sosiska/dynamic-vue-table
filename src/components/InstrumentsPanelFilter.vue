<template>
    <div class="instruments-panel-filter">
        <span>Filter By:</span>
        <InstrumentsList
            checkbox-list-label="Include"
            :items="tableUniqueLabelsStore.getUniqueHeaderTitles"
        />
        <InstrumentsList
            checkbox-list-label="Exclude"
            :items="tableUniqueLabelsStore.getUniqueHeaderTitles"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import InstrumentsList from '@/components/InstrumentsList.vue';
    import { useTableUniqueLabelsStore } from '@/store';

    export default defineComponent({
        name: 'InstrumentsPanelFilter',
        components: {
            InstrumentsList,
        },

        data: () => ({
            tableUniqueLabelsStore: useTableUniqueLabelsStore(),
        }),
    });
</script>
