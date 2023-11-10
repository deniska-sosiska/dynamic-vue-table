<template>
    <div class="instruments-panel-sort">
        <span>Sort By:</span>
        <InstrumentsList
            checkbox-list-label="Sort By"
            :header-items="store.getUniqueHeaderTitles"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import InstrumentsList from '@/components/InstrumentsList.vue';
    import { useStore } from '@/store';

    export default defineComponent({
        name: 'InstrumentsPanelSort',
        components: {
            InstrumentsList,
        },

        data: () => ({
            store: useStore(),
        }),
    });
</script>
