<template>
    <li>
        <label>
            <input
                :id="`checkbox-${getValidID}`"
                type="checkbox"
                :checked="isChecked"
                @change="onChecked"
            />
            <span>{{ label }}</span>
        </label>
        <input
            v-if="isFilterInstrument && isChecked"
            :id="`filter-input-${getValidID}`"
            :placeholder="`Type your ${label} filter...`"
            :aria-invalid="isFilterValueInvalid"
            :value="filterValue"
            type="text"
            class="filter-value-input"
            @focus="resetValidation"
            @change="onChange"
        />
    </li>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';
    import { TRIGGER_VALIDATION_FUNCTION_NAME } from '@/services/triggerValidationFunctionName';

    export default defineComponent({
        name: 'InstrumentsListItem',

        props: {
            label: {
                type: String,
                required: true,
            },
            isChecked: {
                type: Boolean,
                required: true,
            },
            isFilterInstrument: {
                type: Boolean,
                default: false,
            },
            filterValue: {
                type: String,
                default: '',
            },
        },

        emits: [
            eventBusEmitNames.UPDATE_FILTER_VALUE,
            eventBusEmitNames.UPDATE_CHECKED_VALUE,
        ],

        data: () => ({
            isFilterValueInvalid: undefined as true | undefined,
        }),

        computed: {
            getValidID() {
                return this.label.replace(' ', '-');
            },
        },

        methods: {
            onChecked(event: Event) {
                this.resetValidation();
                this.$emit(
                    eventBusEmitNames.UPDATE_CHECKED_VALUE,
                    this.label,
                    (event.target as HTMLInputElement).checked,
                );
            },

            onChange(event: Event) {
                this.$emit(
                    eventBusEmitNames.UPDATE_FILTER_VALUE,
                    this.label,
                    (event.target as HTMLInputElement).value,
                );
            },

            resetValidation() {
                this.isFilterValueInvalid = undefined;
            },

            [TRIGGER_VALIDATION_FUNCTION_NAME]() {
                if (this.filterValue.length === 0) {
                    this.isFilterValueInvalid = true;
                }
            },
        },
    });
</script>
