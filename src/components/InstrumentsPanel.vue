<template>
    <article
        v-show="showInstruments"
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
    import { useStore } from '@/store';

    export default defineComponent({
        name: 'InstrumentsPanel',
        components: {
            InstrumentsPanelSort,
            InstrumentsPanelFilter,
        },

        data: () => ({
            store: useStore(),
        }),

        computed: {
            showInstruments() {
                return this.store.tableUniqueLabels.size;
            },
        },
    });
</script>
