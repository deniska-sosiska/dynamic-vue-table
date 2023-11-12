<template>
    <code v-for="(rule, index) of rules" :key="index">
        <pre v-text="rule"></pre>
        <img src="/src/assets/remove.png" @click="removeFilterRule(index)" />
    </code>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { useStore } from '@/store';
    import { IFilterRuleValue, IFiltersRuleRecordsKey } from '@/interfaces/IFilterRules';

    export default defineComponent({
        name: 'PrettyFilterRule',

        props: {
            rules: {
                type: Object as PropType<IFilterRuleValue[]>,
                required: true,
            },
            filterType: {
                type: String as PropType<IFiltersRuleRecordsKey>,
                required: true,
            }
        },

        data: () => ({
            store: useStore(),
        }),

        methods: {
            removeFilterRule(index: number) {
                this.store.removeFilterRule(this.filterType, index);
            },
        },
    });
</script>
