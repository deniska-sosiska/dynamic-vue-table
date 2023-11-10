<template>
    <li>
        <label>
            <input
                :id="`checkbox-${validID}`"
                type="checkbox"
                :checked="isChecked"
                @change="onChange"
            />
            <span>{{ label }}</span>
        </label>
        <input
            v-if="isFilterInstrument && isChecked"
            :id="`filter-input-${validID}`"
            v-model="value"
            :placeholder="`Type your ${label} filter...`"
            type="text"
        />
    </li>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';

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
        },

        emits: [eventBusEmitNames.UPDATE_CHECKED_VALUE],

        data: () => ({
            value: '',
        }),

        computed: {
            validID() {
                return this.label.replace(' ', '-');
            },
        },

        methods: {
            onChange(event: Event) {
                this.$emit(
                    eventBusEmitNames.UPDATE_CHECKED_VALUE,
                    this.label,
                    (event.target as HTMLInputElement).checked,
                );
            },
        },
    });
</script>
