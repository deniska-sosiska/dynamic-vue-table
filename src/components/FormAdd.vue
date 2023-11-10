<template>
    <div class="form-container">
        <article>
            <header class="text-center">
                Create a new record
                <img src="/src/assets/articles.png" alt="" />
            </header>

            <form @submit.prevent="onSubmit">
                <fieldset>
                    <FormField
                        v-for="(field) of newRecord"
                        ref="formField"
                        :key="field._id"
                        :props-field-details="field"
                        :unique-labels-by-current-record="uniqueLabelsByCurrentRecord"
                        @update-field-details="updateRecordDetails"
                        @remove-record-field="removeRecordField"
                    />
                </fieldset>

                <footer class="button-group">
                    <button
                        type="button"
                        class="outline"
                        @click="createNewField"
                    >
                        Add a new field
                    </button>

                    <button type="submit">
                        Submit
                    </button>
                </footer>
            </form>
        </article>
    </div>
</template>

<script lang="ts">
    import { defineComponent, nextTick } from 'vue';
    import { uid } from 'uid/single';
    import FormField from '@/components/FormField.vue';
    import { EventBus } from '@/services/eventBus';
    import { INewRecord } from '@/interfaces/INewRecord';
    import { IRecordUpdateDetails } from '@/interfaces/IRecordUpdateDetails';
    import { useStore } from '@/store';
    import { TRIGGER_VALIDATION_FUNCTION_NAME } from '@/services/triggerValidationFunctionName';
    import { eventBusEmitNames } from '@/services/eventBusEmitNames';
    import { validationRules } from '@/services/validationRules';

    export default defineComponent({
        name: 'FormAdd',
        components: {
            FormField,
        },

        data: () => ({
            store: useStore(),
            newRecord: [] as INewRecord[],
            uniqueLabelsByCurrentRecord: new Set() as Set<string>,
        }),

        watch: {
            newRecord: {
                deep: true,
                immediate: true,
                handler() {
                    const uq = new Set<string>();
                    this.newRecord.forEach((record) => uq.add(record.label));
                    this.uniqueLabelsByCurrentRecord = uq;
                },
            },
        },

        created() {
            const unsubscribe = this.$watch(
                'store.getUniqueHeaderTitles',
                () => {
                    this.createNewField();
                    unsubscribe();
                },
            );
        },

        methods: {
            updateRecordDetails(fieldDetails: IRecordUpdateDetails) {
                for (const record of this.newRecord) {
                    if (record._id === fieldDetails._id) {
                        if (fieldDetails.newLabel) {
                            record.label = fieldDetails.newLabel;
                            break;
                        }
                        if (fieldDetails.newFieldValue) {
                            record.field = fieldDetails.newFieldValue;
                            break;
                        }
                    }
                }
            },

            createNewField() {
                for (const uniqueHeaderTitle of this.store.getUniqueHeaderTitles) {
                    if (this.uniqueLabelsByCurrentRecord.has(uniqueHeaderTitle)) {
                        continue;
                    }

                    return this.insertNewField(uniqueHeaderTitle);
                }

                this.insertNewField();
            },

            insertNewField(label?: string) {
                this.newRecord.push({
                    _id: uid(),
                    label: label ?? this.getRandomName(),
                    field: uid(),
                });

                nextTick(this.moveScrollToDown);
            },

            removeRecordField(fieldID: string) {
                const index = this.newRecord.findIndex((field) => field._id === fieldID);
                this.newRecord.splice(index, 1);
            },

            getRandomName() {
                const randomNames = ['Flower', 'Butterfly', 'Mystique', 'Luminance', 'Dream'];
                for (const name of randomNames) {
                    if (!this.uniqueLabelsByCurrentRecord.has(name)) {
                        return name;
                    }
                }

                return uid();
            },

            moveScrollToDown() {
                const form = this.$el.querySelector('form');
                form.scrollTo({ top: form.scrollHeight, behavior: 'smooth' });
            },

            triggerValidation(withFocus?: boolean) {
                const formFields = this.$refs.formField as typeof FormField[];
                if (!formFields || !formFields.length) { return; }

                formFields.forEach((component: typeof FormField) => {
                    component[TRIGGER_VALIDATION_FUNCTION_NAME](withFocus);
                });
            },

            validateFieldsBySelector(selector: string): true | void {
                const invalidInputs = this.$el.querySelectorAll(selector);

                if (invalidInputs.length) {
                    invalidInputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return true;
                }
            },

            makeSureAllRequiredFieldsExist() {
                for (const key of validationRules.keys()) {
                    if (this.uniqueLabelsByCurrentRecord.has(key)) {
                        continue;
                    }

                    this.insertNewField(key);
                    nextTick(() => this.triggerValidation(true));
                    return true;
                }
            },

            async validateForm() {
                this.triggerValidation();
                await nextTick();

                if (this.validateFieldsBySelector('label > input[aria-invalid="true"]')) {
                    return true;
                }

                if (this.validateFieldsBySelector('label + input[aria-invalid="true"]')) {
                    return true;
                }

                if (this.makeSureAllRequiredFieldsExist()) {
                    return true;
                }
            },

            async onSubmit() {
                if (!this.newRecord.length ) { return; }

                const isInvalid = await this.validateForm();
                if (isInvalid) { return; }

                const fields = this.newRecord.map((r) => [r.label, r.field]);
                EventBus.$emit(
                    eventBusEmitNames.CREATE_NEW_RECORD,
                    Object.fromEntries(fields),
                );

                this.refreshForm();
            },

            refreshForm() {
                nextTick(() => {
                    this.newRecord = [];
                    this.uniqueLabelsByCurrentRecord.clear();
                    this.createNewField();
                });
            },
        },
    });
</script>
