<template>
    <figure>
        <table
            role="grid"
            class="table"
        >
            <thead>
                <TableRowHeader
                    :header-titles="headerTitles"
                />
            </thead>

            <tbody>
                <TableRowItem
                    v-for="(item, index) of tableItems"
                    :key="item._id"
                    :header-titles="headerTitles"
                    :table-item="item"
                    :table-index="index"
                />
            </tbody>
        </table>
    </figure>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { uid } from 'uid/single';
    import TableRowItem from '@/components/TableRowItem.vue';
    import TableRowHeader from '@/components/TableRowHeader.vue';
    import { ITableItem } from '@/interfaces/ITableItem';
    import { ITableHeader } from '@/interfaces/ITableHeader';

    export default defineComponent({
        name: 'TableMain',
        components: {
            TableRowItem,
            TableRowHeader,
        },

        data: () => ({
            tableItems: [] as ITableItem[],
            headerTitles: [] as ITableHeader[],
        }),

        computed: {},

        mounted() {
            this.tableItems.push({
                _id: uid(),
                name: 'hello',
                pass: '123',
            });

            const tableUniqueKeys = new Set<string>();
            for (const item of this.tableItems) {
                for (const itemKey in item) {
                    if (itemKey === '_id') { continue; }

                    tableUniqueKeys.add(itemKey);
                }
            }

            this.headerTitles = Array.from(tableUniqueKeys);
        }
    });
</script>
