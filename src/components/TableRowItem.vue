<template>
    <tr>
        <th scope="row">
            {{ tableIndex }}
        </th>

        <td
            v-for="(headerTitle) of headerTitles"
            :key="headerTitle"
        >
            {{ tableItem[headerTitle] ?? '- - -' }}
        </td>
    </tr>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { ITableItem } from '@/interfaces/ITableItem';
    import { ITableHeader } from '@/interfaces/ITableHeader';

    export default defineComponent({
        name: 'TableRowItem',

        props: {
            tableIndex: {
                type: Number,
                required: true,
            },
            tableItem: {
                type: Object as PropType<ITableItem>,
                required: true,
            },
            headerTitles: {
                type: Array as PropType<ITableHeader[]>,
                required: true,
            },
        },
    });
</script>
