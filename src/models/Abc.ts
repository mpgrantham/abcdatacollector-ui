export interface Abc {
    id: number;
    typeCode: string;
    value: string;
    selected?: number;
    selectedFlag?: boolean;
    activeFl: string;
    action?: 'A' | 'U' | 'D' | undefined
}
