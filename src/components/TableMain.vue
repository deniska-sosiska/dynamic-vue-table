<template>
    <figure>
        <table
            v-show="showTable"
            role="grid"
            class="table"
        >
            <thead>
                <TableRowHeader
                    :header-titles="store.getUniqueHeaderTitles"
                />
            </thead>

            <tbody>
                <TableRowItem
                    v-for="(item, index) of sortedItems"
                    :key="item._id"
                    :header-titles="store.getUniqueHeaderTitles"
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
    import { ITableItem, TABLE_ITEM_STATIC_KEYS } from '@/interfaces/ITableItem';
    import { useStore } from '@/store';
    import { EventBus } from '@/services/eventBus';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';
    import { ISortRule } from '@/interfaces/ISortRule';

    const LOCALSTORAGE_TABLE_ITEM_KEY = 'table-item-timestamp-';

    export default defineComponent({
        name: 'TableMain',
        components: {
            TableRowItem,
            TableRowHeader,
        },

        data: () => ({
            store: useStore(),
            tableItems: [] as ITableItem[],
        }),

        computed: {
            showTable() {
                return this.tableItems.length;
            },

            sortedItems() {
                return this.sortItems(this.store.sortRules);
            },
        },

        watch: {
            tableItems: {
                deep: true,
                handler() {
                    const ul = this.getTableUniqueLabels();
                    this.store.updateTableUniqueLabelsState(ul);
                },
            },
        },

        created() {
            this.initializeTableItems();
            EventBus.$on(eventBusEmitNames.CREATE_NEW_RECORD, this.createTableItem);
        },

        methods: {
            getTableUniqueLabels() {
                const tableUniqueKeys = new Set<string>();

                for (const item of this.tableItems) {
                    for (const itemKey in item) {
                        if (TABLE_ITEM_STATIC_KEYS.has(itemKey)) { continue; }

                        tableUniqueKeys.add(itemKey);
                    }
                }

                return tableUniqueKeys;
            },

            createTableItem(newRecord: Omit<ITableItem, '_id' | '_timestamp'>) {
                this.tableItems.push({
                    _id: uid(),
                    _timestamp: Date.now(),
                    ...newRecord,
                });
                this.setToLocalStorage(this.tableItems.at(-1)!);
            },

            removeTableItem(itemID: string) {
                const index = this.tableItems.findIndex((item) => item._id === itemID);
                this.tableItems.splice(index, 1);
                this.removeFromLocalStorage(itemID);
            },

            sortItems(newSortRules: ISortRule[]) {
                if (!newSortRules.length) { return this.tableItems; }

                const copyTableItems = [...this.tableItems];

                copyTableItems.sort((a, b) => {
                    for (const rule of newSortRules) {
                        const fieldByKeyA = a[rule];
                        const fieldByKeyB = b[rule];

                        if (fieldByKeyA !== undefined && fieldByKeyB !== undefined) {
                            if (fieldByKeyA > fieldByKeyB) { return 1; }
                            if (fieldByKeyA < fieldByKeyB) { return -1; }
                        }

                        if (fieldByKeyA === undefined && fieldByKeyB !== undefined) { return 1; }
                        if (fieldByKeyB === undefined && fieldByKeyA !== undefined) { return -1; }
                    }

                    return 0;
                });

                return copyTableItems;
            },

            setToLocalStorage(item: ITableItem) {
                localStorage.setItem(LOCALSTORAGE_TABLE_ITEM_KEY + item._id, JSON.stringify(item));
            },

            removeFromLocalStorage(itemID: string) {
                localStorage.removeItem(LOCALSTORAGE_TABLE_ITEM_KEY + itemID);
            },

            initializeTableItems() {
                const localItems = [];

                for (const key of Object.keys(localStorage)) {
                    if (!key.startsWith(LOCALSTORAGE_TABLE_ITEM_KEY)) { continue; }

                    localItems.push(
                        JSON.parse(localStorage.getItem(key) as string),
                    );
                }

                localItems.sort((a: ITableItem, b: ITableItem) => +a._timestamp - +b._timestamp);
                this.tableItems = localItems;
            },
        },
    });
</script>
