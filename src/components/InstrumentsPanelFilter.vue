<template>
    <div class="instruments-panel-filter">
        <span>Filter By:</span>
        <InstrumentsList
            checkbox-list-label="Include"
            :header-items="store.getUniqueHeaderTitles"
        />
        <InstrumentsList
            checkbox-list-label="Exclude"
            :header-items="store.getUniqueHeaderTitles"
        />

        <button @click="onClick">Click me</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import InstrumentsList from '@/components/InstrumentsList.vue';
    import { useStore } from '@/store';

    export default defineComponent({
        name: 'InstrumentsPanelFilter',
        components: {
            InstrumentsList,
        },

        data: () => ({
            store: useStore(),
        }),

        methods: {
            onClick() {
                // this.store.updateFilterRules('key', 'value');
            }
        },
    });
</script>
