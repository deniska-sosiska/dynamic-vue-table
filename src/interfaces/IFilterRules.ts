import { ITableHeader } from '@/interfaces/ITableHeader';

export type IFiltersRuleRecordsKey = 'include' | 'exclude';

export type IFilterRuleKey = ITableHeader;

export interface IFilterRuleValue {
    [key: IFilterRuleKey]: string;
}

export type IFiltersRuleRecords = {
    [key in IFiltersRuleRecordsKey]: IFilterRuleValue[];
}
