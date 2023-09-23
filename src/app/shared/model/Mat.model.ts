import { AfterContentChecked, ChangeDetectorRef, Directive } from "@angular/core";

export enum MatType {
    OBJECT = 'object',
    ARRAY = 'array',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export interface MatRow {

}

export class MatList<T> {

    constructor(private list: T[], private matType: MatType) {
    }

    createEmptyItem(): T {
        switch(this.matType) {
            case MatType.OBJECT:
                return {} as T;
            case MatType.ARRAY:
                return [] as T;
            case MatType.STRING:
                return '' as T;
            case MatType.NUMBER:
                return 0 as T;
            case MatType.BOOLEAN:
                return false as T;
            default:
                break;
        }

        throw new Error("Mat Type not supported");
    }

    pushEmptyItem(): void {
        let item = this.createEmptyItem();
        this.list.push(item);
    }

    getMatType(): MatType {
        return this.matType;
    }
    
    getList(): T[] {
        return this.list;
    }

    getCopyList(): T[] {
        return structuredClone(this.list);
    }

    size(): number {
        return this.list.length;
    }
}

export interface MatOption {
    value: any, 
    valueLabel: string, 
    disable?: boolean
}

export interface Time {
    id?: number;
    year?: number;
    month?: number;
    day?: number;
    hours?: number;
    minute?: number;
    second?: number;
}