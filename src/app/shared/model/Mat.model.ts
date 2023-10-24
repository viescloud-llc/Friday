import { AfterContentChecked, ChangeDetectorRef, Directive } from "@angular/core";

export enum MatType {
    OBJECT = 'object',
    ARRAY = 'array',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export enum MatItemSettingType {
    DISABLE = <any>'Disable',
    REQUIRE = <any>'Require',
    INDEX = <any>'Index',
    HIDE = <any>'Hide'
}

export enum MatTableSettingType {
    DISPLAY_VALUE_FN = <any>'DisplayValueFn',
    DISPLAY_LABEL = <any>'Label',
    INDEX = <any>'Index',
    HIDE = <any>'Hide'
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
    key: string;
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

export class MatFromFieldInputDynamicItem {
    ref: any;
    blankObject: any;
    key: string = '';
    value: any;
    settings: MatItemSetting[] = [];
    index?: number;

    constructor(ref: any, blankObject: any, keyLabel: string, value: any, settings: MatItemSetting[], index?: number) {
        this.ref = ref;
        this.blankObject = blankObject;
        this.key = keyLabel;
        this.value = value;
        this.settings = settings;
        this.index = index ?? 0;
    }

    setValueFn(value: any) {
        this.ref[this.key] = value;
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

// Mat input

/**
 * 
 * @param disable input is disable
 * @returns 
 */
export const matInputDisable = (disable?: boolean) => {
    return function matInputDisable(object: any, key: any) {
        addValue(object, key, MatItemSettingType.DISABLE.toString(), disable, true);
    }
}

/**
 * 
 * @param require input is require
 * @returns 
 */
export const matInputRequire = (require?: boolean) => {
    return function matInputRequire(object: any, key: any) {
        addValue(object, key, MatItemSettingType.REQUIRE.toString(), require, true);
    }
}

/**
 * 
 * @param hide hidden this input
 * @returns 
 */
export const matInputHide = (hide?: boolean) => {
    return function matInputHide(object: any, key: any) {
        addValue(object, key, MatItemSettingType.HIDE.toString(), hide, true);
    }
}

/**
 * this function is all in one setting for dynamic input component
 * @param index indexing input
 * @param require input is require
 * @param disable input is disable
 * @param hide hidden this input
 * @returns 
 */
export const matInputSetting = (index: number, require?: boolean, disable?: boolean, hide?: boolean) => {
    return function matInputDisable(object: any, key: any) {
        addValue(object, key, MatItemSettingType.INDEX.toString(), index, 0);
        addValue(object, key, MatItemSettingType.DISABLE.toString(), disable, false);
        addValue(object, key, MatItemSettingType.REQUIRE.toString(), require, false);
        addValue(object, key, MatItemSettingType.HIDE.toString(), hide, false);
    }
}

// Mat table
/**
 * 
 * @param index indexing this column
 * @returns 
 */
export const matTableIndex = (index: number) => {
    return function matTableIndex(object: any, key: any) {
        addValue(object, key, MatTableSettingType.INDEX.toString(), index, 0);
    }
}

/**
 * 
 * @param hide hidden column
 * @returns 
 */
export const matTableHide = (hide?: boolean) => {
    return function matTableHide(object: any, key: any) {
        addValue(object, key, MatTableSettingType.HIDE.toString(), hide, false);
    }
}

/**
 * 
 * @param label label of column
 * @param displayValueFn this function should be (obj: T) => string
 * @returns 
 */
export const matTableSetting = (label?: string, displayValueFn?: Function) => {
    return function matTableSetting(object: any, key: any) {
        addValue(object, key, MatTableSettingType.DISPLAY_LABEL.toString(), label, null);
        addValue(object, key, MatTableSettingType.DISPLAY_VALUE_FN.toString(), displayValueFn, null);
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

const addValue = (object: any, key: any, surFix: string, value: any, defaultValue: any) => {
    let name = key + surFix

    Object.defineProperty(object, name, {
        value: value ?? defaultValue,
        writable: true,
        configurable: true,
        enumerable: true
    })
}