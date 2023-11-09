<template>
    <figure>
        <table
            v-show="showTable"
            role="grid"
            class="table"
        >
            <thead>
                <TableRowHeader
                    :header-titles="tableUniqueLabelsStore.getUniqueHeaderTitles"
                />
            </thead>

            <tbody>
                <TableRowItem
                    v-for="(item, index) of tableItems"
                    :key="item._id"
                    :header-titles="tableUniqueLabelsStore.getUniqueHeaderTitles"
                    :table-item="item"
                    :table-index="index + 1"
                    @remove-table-item="removeTableItem"
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
    import { useTableUniqueLabelsStore } from '@/store';
    import { EventBus } from '@/services/eventBus';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';

    export default defineComponent({
        name: 'TableMain',
        components: {
            TableRowItem,
            TableRowHeader,
        },

        data: () => ({
            tableUniqueLabelsStore: useTableUniqueLabelsStore(),
            tableItems: [
                {
                    _id: uid(),
                    name: 'hello',
                    email: 'test@test.com',
                },
                {
                    _id: uid(),
                    name: 'second item',
                    email: 'call@example.com',
                    description: 'Lorem Ipsum'
                },
                {
                    _id: uid(),
                    name: 'third item',
                    description: 'Lorem Ipsum'
                },
            ] as ITableItem[],
        }),

        computed: {
            showTable() {
                return this.tableItems.length;
            }
        },

        watch: {
            tableItems: {
                deep: true,
                immediate: true,
                handler() {
                    const ul = this.getTableUniqueLabels();
                    this.tableUniqueLabelsStore.updateTableUniqueLabelsState(ul);
                },
            },
        },

        created() {
            EventBus.$on<Omit<ITableItem, '_id'>>(eventBusEmitNames.CREATE_NEW_RECORD, (newRecord) => {
                this.tableItems.push({ _id: uid(), ...newRecord });
            });
        },

        methods: {
            getTableUniqueLabels() {
                const tableUniqueKeys = new Set<string>();
                for (const item of this.tableItems) {
                    for (const itemKey in item) {
                        if (itemKey === '_id') { continue; }

                        tableUniqueKeys.add(itemKey);
                    }
                }

                return tableUniqueKeys;
            },

            removeTableItem(itemID: string) {
                const index = this.tableItems.findIndex((item) => item._id === itemID);
                this.tableItems.splice(index, 1);
            },
        },
    });
</script>
