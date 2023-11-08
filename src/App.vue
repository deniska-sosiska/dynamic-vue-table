<template>
    <main class="">
        <TableMain />
    </main>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import FormAdd from '@/components/FormAdd.vue';
    import TableMain from '@/components/TableMain.vue';

    export default defineComponent({
        name: 'App',
        components: {
            TableMain,
        },
        data: () => ({}),
    });
</script>
