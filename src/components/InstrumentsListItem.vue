<template>
    <li>
        <label>
            <input
                :id="`checkbox-${label.replace(' ', '-')}`"
                type="checkbox"
                :checked="isChecked"
                @change="onChange"
            />
            {{ label }}
        </label>
        <input
            v-if="isFilterInstrument"
            v-model="value"
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
