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
        },

        emits: [eventBusEmitNames.UPDATE_CHECKED_VALUE],

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
