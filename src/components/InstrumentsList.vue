<template>
    <details role="list">
        <summary aria-haspopup="listbox">{{ checkboxListLabel }}</summary>
        <ul role="listbox">
            <InstrumentsListItem
                v-for="(item) of items"
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
            items: {
                type: Array as PropType<ITableHeader[]>,
                required: true,
            },
        },

        data: () => ({
            checkedItems: [] as ITableHeader[],
        }),

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
