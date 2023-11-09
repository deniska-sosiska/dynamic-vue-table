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

    const TABLE_KEY = 'table-key-';

    export default defineComponent({
        name: 'TableMain',
        components: {
            TableRowItem,
            TableRowHeader,
        },

        data: () => ({
            tableUniqueLabelsStore: useTableUniqueLabelsStore(),
            tableItems: [] as ITableItem[],
        }),

        computed: {
            showTable() {
                return this.tableItems.length;
            }
        },

        watch: {
            tableItems: {
                deep: true,
                handler() {
                    const ul = this.getTableUniqueLabels();
                    this.tableUniqueLabelsStore.updateTableUniqueLabelsState(ul);
                },
            },
        },

        created() {
            const localStorageKey = Object.keys(localStorage);

            for (const key of localStorageKey) {
                if (!key.startsWith(TABLE_KEY)) { continue; }

                this.tableItems.push(
                    JSON.parse(localStorage.getItem(key) as string),
                );
            }

            EventBus.$on<Omit<ITableItem, '_id'>>(eventBusEmitNames.CREATE_NEW_RECORD, (newRecord) => {
                this.tableItems.push({ _id: uid(), ...newRecord });
                this.setToLocalStorage(this.tableItems.at(-1)!);
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

            setToLocalStorage(item: ITableItem) {
                localStorage.setItem(TABLE_KEY + item._id, JSON.stringify(item));
            },

            removeFromLocalStorage(itemID: string) {
                localStorage.removeItem(TABLE_KEY + itemID);
            },
        },
    });
</script>
