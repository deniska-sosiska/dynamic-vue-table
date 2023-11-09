import { IValidationRule, TValidation } from '@/interfaces/IValidationRule';

const rules: IValidationRule[] = [
    { label: 'name', validation: (value: string) => value.length > 3 },
    { label: 'email' },
];

const validationRules: Map<string, TValidation | undefined> = new Map();

for (const rule of rules) {
    validationRules.set(rule.label, rule.validation);
}

export { validationRules };
