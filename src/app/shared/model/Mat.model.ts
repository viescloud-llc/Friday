import { AfterContentChecked, ChangeDetectorRef, Directive } from "@angular/core";

export enum MatType {
    OBJECT = 'object',
    ARRAY = 'array',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export enum MatItemSettingType {
    DISABLE = <any>'disable',
    REQUIRE = <any>'require'
}

export class MatItemSetting {
    type: MatItemSettingType;
    value: any;

    constructor(type: MatItemSettingType, value?: any) {
        this.type = type;
        if(value)
            this.value = value;
        else
            this.value = type;
    }

    equalType(type: MatItemSettingType) {
        return this.type === type;
    }
}

export interface MatDialogItem {
    getIdFn: () => any;
}

export interface MatColumn {
    index: number;
    label?: string;
    getDisplayValueFn?: (obj: any) => any;
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

export class MatListItem<T> {
    constructor(private ref?: T, public key?: string, private setter?: (ref: T, value: T) => void, private getter?: (ref: T) => any, public disable: boolean = false) { }

    getValue() {
        if (this.ref && this.getter)
            return this.getter(this.ref);
    }

    setValue(value: T) {
        if (this.ref && this.setter)
            this.setter(this.ref, value);
    }

    isEmpty() {
        return !this.ref;
    }
}

export class MatList<T> {

    constructor(protected list: T[], private matType: MatType) {
    }

    createEmptyItem(): T {
        switch (this.matType) {
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

    getType(): string {
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

    getMatItemList(): MatListItem<T>[] {
        throw new Error("Mat item list not supported");
    }
}

export class MatFromFieldInputDynamicData {
    parentRef: any;
    currentRef: any;

    constructor(parentRef: any, currentRef?: any) {
        this.parentRef = parentRef;

        if(currentRef)
            this.currentRef = currentRef;
    }
}

export class MatFromFieldInputDynamicItem {
    ref: any;
    key: string = '';
    value: any;
    settings: MatItemSetting[] = [];

    constructor(ref: any, keyLabel: string, value: any, settings: MatItemSetting[]) {
        this.ref = ref;
        this.key = keyLabel;
        this.value = value;
        this.settings = settings;
    }

    setValueFn(value: any) {
        this.ref = value;
    };

    containSetting(setting: string | MatItemSettingType): boolean {
        let include = false;
        
        if(typeof setting === 'string') {
            setting = MatItemSettingType[setting.toUpperCase() as any];
            if(setting) {
                this.settings.forEach(e => {
                    if(e.equalType(setting as MatItemSettingType))
                        include = true;
                })
            }
        }
        else {
            this.settings.forEach(e => {
                if(e.equalType(setting as MatItemSettingType))
                    include = true;
            })
        }

        return include;
    }
}

export const matInputDisable = (disable: boolean) => {
    return function matInputDisable(object: any, key: any) {
        let value = object[key];
        let name = key + 'Disable'
    
        Object.defineProperty(object, name, {
            value: disable,
            writable: true,
            configurable: true,
            enumerable: true
        })
    }
}

export const matInputRequire = (require: boolean) => {
    return function matInputDisable(object: any, key: any) {
        let value = object[key];
        let name = key + 'Require'
    
        Object.defineProperty(object, name, {
            value: require,
            writable: true,
            configurable: true,
            enumerable: true
        })
    }
}

export const addGetPrototype = (object: any) => {
    Object.defineProperty(object, "getPrototype", {
        value: function a() {},
        writable: true,
        configurable: true,
        enumerable: true
    })
}