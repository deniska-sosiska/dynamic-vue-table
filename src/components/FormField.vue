<template>
    <label :for="getPropsLabelAsAttribute">
        <input
            v-if="isLabelEditing"
            ref="labelInputRef"
            type="text"
            :name="localLabel"
            :value="localLabel"
            :aria-invalid="isLabelInvalid"
            @focus.prevent.stop="clearInvalidStatus('label')"
            @blur.prevent.stop="onChangeLabel"
            @keypress.enter.prevent="onEnterLabel"
        />

        <span
            v-else
            @click.prevent.stop="changeLabelEditingStatus()"
        >
            {{ localLabel }}
        </span>

        <img
            :src="isLabelEditing ? acceptImageUrl : pencilImageUrl"
            :class="{ 'scale': !isLabelEditing }"
            @click.prevent.stop="labelEditAction()"
        />

        <img
            src="/src/assets/remove.png"
            class="remove"
            @click.prevent.stop="removeField"
        />
    </label>

    <input
        :id="getPropsLabelAsAttribute"
        ref="fieldInputRef"
        :name="getPropsLabelAsAttribute"
        type="text"
        placeholder="Type something..."
        :value="localFieldValue"
        :aria-invalid="isFieldInvalid"
        @focus="clearInvalidStatus('field')"
        @change="onChangeField"
        @keypress.enter.prevent="onChangeField"
    />
    <small v-if="isFieldInvalid">Make sure the field is not empty and consistent with validation rules</small>
</template>

<script lang="ts">
    import pencilImageUrl from '@/assets/pencil.png?url';
    import acceptImageUrl from '@/assets/accept.png?url';

    import { defineComponent, nextTick, PropType } from 'vue';
    import { INewRecord } from '@/interfaces/INewRecord';
    import { IRecordUpdateDetails } from '@/interfaces/IRecordUpdateDetails';
    import { validationRules } from '@/services/validationRules';
    import { TRIGGER_VALIDATION_FUNCTION_NAME } from '@/services/triggerValidationFunctionName';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';

    export default defineComponent({
        name: 'FormField',

        props: {
            propsFieldDetails: {
                type: Object as PropType<INewRecord>,
                required: true,
            },
            uniqueLabelsByCurrentRecord: {
                type: Object as PropType<Set<string>>,
                required: true,
            },
        },

        emits: [eventBusEmitNames.UPDATE_FIELD_DETAILS, eventBusEmitNames.REMOVE_RECORD_FIELD],

        data: () => ({
            pencilImageUrl,
            acceptImageUrl,
            localLabel: '',
            localFieldValue: '',
            isLabelEditing: false,
            isLabelInvalid: undefined as true | undefined,
            isFieldInvalid: undefined as true | undefined,
        }),

        computed: {
            getPropsLabelAsAttribute() {
                return this.propsFieldDetails.label.replace(' ', '');
            },
        },

        watch: {
            propsFieldDetails: {
                deep: true,
                immediate: true,
                handler() { this.updateLocalDetailsByProps(); },
            },
        },

        created() {
            this.updateLocalDetailsByProps();
        },

        methods: {
            validateLabelValue(event?: Event) {
                const localLabelValue = (event && this.getValueFromEvent(event)) ?? this.localLabel;
                if (!localLabelValue) {
                    return this.isLabelInvalid = true;
                }

                const isLocalLabelAlreadyExist = this.uniqueLabelsByCurrentRecord.has(localLabelValue);
                if (isLocalLabelAlreadyExist) {
                    const isSameField = this.propsFieldDetails.label === localLabelValue;
                    if (isSameField) { return; }

                    this.isLabelInvalid = true;
                }
            },

            validateFieldValue(event?: Event) {
                const localFieldValue = (event && this.getValueFromEvent(event)) ?? this.localFieldValue;
                if (!localFieldValue) {
                    return this.isFieldInvalid = true;
                }

                if (validationRules.has(this.localLabel)) {
                    const rule = validationRules.get(this.localLabel);
                    if (!rule) { return; }

                    const isValid = rule(localFieldValue);
                    if (!isValid) {
                        this.isFieldInvalid = true;
                    }
                }
            },

            labelEditAction(isEnterEvent?: boolean) {
                if (!this.isLabelEditing) {
                    return this.changeLabelEditingStatus();
                }

                if (this.isLabelInvalid) {
                    return;
                }

                this.saveNewRecordDetails('label');
                this.changeLabelEditingStatus(isEnterEvent, isEnterEvent);
            },

            saveNewRecordDetails(type: 'label' | 'field') {
                if (type === 'label' && this.propsFieldDetails.label === this.localLabel) { return; }
                if (type === 'field' && this.propsFieldDetails.field === this.localFieldValue) { return; }

                const recordDetails: IRecordUpdateDetails = {
                    _id: this.propsFieldDetails._id,
                    newLabel: type === 'label' ? this.localLabel : undefined,
                    newFieldValue: type === 'field' ? this.localFieldValue : undefined,
                };

                this.$emit(eventBusEmitNames.UPDATE_FIELD_DETAILS, recordDetails);
            },

            onChangeLabel(event: Event) {
                this.validateLabelValue(event);
                this.localLabel = this.getValueFromEvent(event);

                if (event.type === 'blur') {
                    this.labelEditAction();
                }
            },

            onEnterLabel(event: Event) {
                this.onChangeLabel(event);
                this.labelEditAction(true);
            },

            onChangeField(event: Event) {
                this.localFieldValue = this.getValueFromEvent(event);
                this.saveNewRecordDetails('field');
            },

            async changeLabelEditingStatus(withoutFocus?: boolean, isEnterEvent?: boolean) {
                this.isLabelEditing = !this.isLabelEditing;

                if (this.isLabelEditing && !withoutFocus) {
                    return nextTick().then(() => (this.$refs.labelInputRef as HTMLInputElement)?.focus());
                }

                if (!this.isLabelEditing && isEnterEvent) {
                    await nextTick().then(() => (this.$refs.labelInputRef as HTMLInputElement)?.blur());
                    await nextTick().then(() => (this.$refs.fieldInputRef as HTMLInputElement)?.focus());
                }
            },

            removeField() {
                this.$emit(eventBusEmitNames.REMOVE_RECORD_FIELD, this.propsFieldDetails._id);
            },

            updateLocalDetailsByProps() {
                this.localLabel = this.propsFieldDetails.label;
                this.localFieldValue = this.propsFieldDetails.field;

                this.isLabelInvalid = undefined;
                this.isFieldInvalid = undefined;
            },

            getValueFromEvent(event: Event): string {
                return (event.target as HTMLInputElement).value.trim();
            },

            clearInvalidStatus(type: 'label' | 'field') {
                if (type === 'label') {
                    return this.isLabelInvalid = undefined;
                }
                this.isFieldInvalid = undefined;
            },

            [TRIGGER_VALIDATION_FUNCTION_NAME](withFocus?: boolean) {
                this.validateFieldValue();
                if (withFocus) {
                    nextTick(() => (this.$refs.fieldInputRef as HTMLInputElement)?.focus());
                }

                this.validateLabelValue();

                if (this.isLabelEditing) {
                    if (!this.isLabelInvalid) {
                        this.saveNewRecordDetails('label');
                        this.changeLabelEditingStatus(true);
                    }
                    return;
                }

                if (!this.isLabelEditing) {
                    if (this.isLabelInvalid) {
                        this.changeLabelEditingStatus(true);
                    }
                }

            },
        },
    });
</script>
