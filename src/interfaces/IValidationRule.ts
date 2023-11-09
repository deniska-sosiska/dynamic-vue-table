
export type TValidation = (value: string) => boolean;
export interface IValidationRule {
    label: string;
    validation?: TValidation;
}
