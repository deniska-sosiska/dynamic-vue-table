<template>
    <main>
        <FormAdd />
        <InstrumentsPanel />
        <TableMain />
    </main>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import FormAdd from '@/components/FormAdd.vue';
    import TableMain from '@/components/TableMain.vue';
    import InstrumentsPanel from '@/components/InstrumentsPanel.vue';

    export default defineComponent({
        name: 'App',
        components: {
            FormAdd,
            TableMain,
            InstrumentsPanel,
        },
    });
</script>
