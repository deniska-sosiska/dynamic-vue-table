<template>
    <details
        ref="dropdown"
        role="list"
    >
        <summary aria-haspopup="listbox">{{ checkboxListLabel }}</summary>
        <ul role="listbox">
            <slot name="existing-rules"></slot>

            <InstrumentsListItem
                v-for="(item) of headerItems"
                ref="instrumentsListItem"
                :key="item"
                :label="item"
                :is-checked="isChecked(item)"
                :is-filter-instrument="isFilterInstrument"
                :filter-value="filterValueByLabel(item)"
                @update-checked-value="updateCheckedList"
                @update-filter-value="updateFilterValuesList"
            />
            <li
                v-if="isFilterInstrument && checkedItems.length"
                class="filters-save-button"
                @click="saveFilterRules"
            >
                <button
                    :aria-disabled="isSavedAction"
                    :class="{ 'outline': isSavedAction }"
                >
                    {{ getFavoriteSaveButtonText }}
                </button>
            </li>
        </ul>
    </details>
</template>

<script lang="ts">
    import { defineComponent, nextTick, PropType } from 'vue';
    import InstrumentsListItem from '@/components/InstrumentsListItem.vue';
    import { useStore } from '@/store';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';
    import { IFilterRuleKey, IFilterRuleValue } from '@/interfaces/IFilterRules';
    import { TRIGGER_VALIDATION_FUNCTION_NAME } from '@/services/triggerValidationFunctionName';
    import { ITableHeader } from '@/interfaces/ITableHeader';


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
                type: Array as PropType<IFilterRuleKey[]>,
                required: true,
            },
            isFilterInstrument: {
                type: Boolean,
                default: false,
            },
            isSortInstrument: {
                type: Boolean,
                default: false,
            },
        },

        emits: [eventBusEmitNames.UPDATE_INSTRUMENT_RULES],

        data: () => ({
            isSavedAction: false,
            store: useStore(),
            checkedItems: [] as ITableHeader[],
            filterValues: new Map<string, string>(),
        }),

        computed: {
            getFavoriteSaveButtonText() {
                return this.isSavedAction ? 'Saved' : 'Save filter rules';
            },
        },

        methods: {
            isChecked(label: string) {
                return this.checkedItems.includes(label);
            },

            filterValueByLabel(label: string) {
                return this.filterValues.get(label);
            },

            updateCheckedValue(label: string, checked: boolean) {
                if (checked) {
                    return this.checkedItems.push(label);
                }

                this.checkedItems = this.checkedItems.filter((i) => i !== label);

                if (this.isFilterInstrument) {
                    this.filterValues.delete(label);
                }
            },

            updateCheckedList(label: string, checked: boolean) {
                this.updateCheckedValue(label, checked);

                if (this.isSortInstrument) {
                    this.$emit(eventBusEmitNames.UPDATE_INSTRUMENT_RULES, this.checkedItems);
                }
            },

            updateFilterValuesList(label: string, value: string) {
                this.filterValues.set(label, value);
            },

            triggerRulesValidation() {
                const instrumentsListItems = this.$refs.instrumentsListItem as typeof InstrumentsListItem[];
                if (!instrumentsListItems || !instrumentsListItems.length) { return; }

                instrumentsListItems.forEach((component: typeof InstrumentsListItem) => {
                    component[TRIGGER_VALIDATION_FUNCTION_NAME]();
                });
            },

            validateInputs(): true | void {
                const invalidInputs = this.$el.querySelectorAll('.filter-value-input[aria-invalid="true"]');

                if (invalidInputs.length) {
                    const list = (this.$refs.dropdown as HTMLElement)?.querySelector('ul');
                    list?.scrollTo({ top: invalidInputs[0].parentNode.offsetTop, behavior: 'smooth' });
                    return true;
                }
            },

            async saveFilterRules() {
                this.triggerRulesValidation();
                await nextTick();

                if (this.validateInputs()) {
                    return;
                }

                const filterRules: IFilterRuleValue = {};
                for (const [key] of this.filterValues) {
                    filterRules[key] = this.filterValues.get(key) as string;
                }

                this.$emit(eventBusEmitNames.UPDATE_INSTRUMENT_RULES, filterRules);
                this.closeDropdown();
            },

            clearData() {
                this.checkedItems = [];
                this.filterValues.clear();
                this.isSavedAction = false;
                (this.$refs.dropdown as HTMLElement)?.removeAttribute('open');
            },

            closeDropdown() {
                this.isSavedAction = true;
                setTimeout(this.clearData, 1200);
            },
        },
    });
</script>
