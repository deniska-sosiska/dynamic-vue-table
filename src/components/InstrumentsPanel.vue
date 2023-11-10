<template>
    <article
        v-if="showInstruments"
        class="instruments-panel"
    >
        <InstrumentsPanelFilter />
        <InstrumentsPanelSort />
    </article>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import InstrumentsPanelFilter from '@/components/InstrumentsPanelFilter.vue';
    import InstrumentsPanelSort from '@/components/InstrumentsPanelSort.vue';
    import { useTableUniqueLabelsStore } from '@/store';

    export default defineComponent({
        name: 'InstrumentsPanel',
        components: {
            InstrumentsPanelSort,
            InstrumentsPanelFilter,
        },

        data: () => ({
            tableUniqueLabelsStore: useTableUniqueLabelsStore(),
        }),

        computed: {
            showInstruments() {
                return this.tableUniqueLabelsStore.tableUniqueLabels.size;
            },
        },
    });
</script>
