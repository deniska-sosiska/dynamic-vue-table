<template>
    <details role="list">
        <summary aria-haspopup="listbox">{{ checkboxListLabel }}</summary>
        <ul role="listbox">
            <InstrumentsListItem
                v-for="(item) of headerItems"
                :key="item"
                :label="item"
                :is-checked="isChecked(item)"
                @update-checked-value="updateSortList"
            />
        </ul>
    </details>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { ITableHeader } from '@/interfaces/ITableHeader';
    import InstrumentsListItem from '@/components/InstrumentsListItem.vue';
    import { useStore } from '@/store';

    export default defineComponent({
        name: 'InstrumentsList',
        components: {
            InstrumentsListItem,
        },

        props: {
            checkboxListLabel: {
                type: String,
                required: true,
            },
            headerItems: {
                type: Array as PropType<ITableHeader[]>,
                required: true,
            },
        },

        data: () => ({
            store: useStore(),
            checkedItems: [] as ITableHeader[],
        }),

        watch: {
            checkedItems: {
                deep: true,
                handler(nv: ITableHeader[]) {
                }
            },
        },

        methods: {
            updateSortList(label: string, checked: boolean) {
                if (checked) {
                    return this.checkedItems.push(label);
                }

                this.checkedItems = this.checkedItems.filter((i) => i !== label);
            },

            isChecked(label: string) {
                return this.checkedItems.includes(label);
            },
        },
    });
</script>
