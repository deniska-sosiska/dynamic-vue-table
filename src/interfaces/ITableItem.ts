export interface ITableItem {
    _id: string;
    _timestamp: number;
    [key: string]: string | number | undefined;
}

export const TABLE_ITEM_STATIC_KEYS= new Set<keyof ITableItem>(['_id', '_timestamp']);
