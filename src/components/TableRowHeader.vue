<template>
    <tr>
        <th class="small-th" scope="col">#</th>
        <th
            v-for="(title, index) of headerTitles"
            :key="index"
            scope="col"
        >
            {{ title }}
        </th>
        <th class="small-th text-center" scope="col">
            <img src="/src/assets/trash.png" alt="" />
        </th>
    </tr>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { ITableHeader } from '@/interfaces/ITableHeader';

    export default defineComponent({
        props: {
            headerTitles: {
                type: Array as PropType<ITableHeader[]>,
                required: true,
            },
        },
    });
</script>
