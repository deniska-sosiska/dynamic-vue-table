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

        <td
            class="remove-item text-center"
            @click="removeItem"
        >
            <img src="/src/assets/remove.png" />
        </td>
    </tr>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { ITableItem } from '@/interfaces/ITableItem';
    import { ITableHeader } from '@/interfaces/ITableHeader';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';

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

        emits: [eventBusEmitNames.REMOVE_TABLE_ITEM],

        methods: {
            removeItem() {
                this.$emit(eventBusEmitNames.REMOVE_TABLE_ITEM, this.tableItem._id);
            }
        },
    });
</script>

