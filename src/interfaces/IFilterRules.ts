import { ITableHeader } from '@/interfaces/ITableHeader';

export type IFilterRuleKey = 'include' | 'exclude';
export type IFilterRuleValue = ITableHeader[];

export type IFilterRules = {
    [key in IFilterRuleKey]: IFilterRuleValue;
}
