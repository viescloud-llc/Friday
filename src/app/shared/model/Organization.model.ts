import { MatColumn, addGetPrototype, matInputDisable, matInputHide, matInputRequire, matInputSetting, matTableHide, matTableIndex, matTableSetting } from "./Mat.model";

export class Organization {
    id?:                  string;
    users?:               User[];
    roles?:               Role[];
    organizationProfile?: OrganizationProfile;
    smtp?:                SMTP;

    constructor() {
    }
}

export class OrganizationProfile {
    @matInputSetting(0, true, true)
    id?:           number = 0;

    @matInputSetting(1, true)
    name?:         string = '';

    @matInputSetting(2, true)
    publicEmail?:  string = '';

    @matInputSetting(3, true)
    timeZone?:     string = '';

    @matInputSetting(4, true)
    address?:      string = '';

    @matInputSetting(5, true)
    city?:         string = '';

    @matInputSetting(6, true)
    state?:        string = '';

    @matInputSetting(7, true)
    zip?:          number = 0;

    @matInputSetting(8, true)
    socialMedias?: string[] = [''] as string[];

    @matInputSetting(9, true)
    bio?:          string = '';
}

export class Role {
    @matInputDisable(true)
    id?:         number;
    @matInputRequire(true)
    title?:      string;
    active?:     boolean;

    @matTableHide(true)
    permission?: Permission;

    constructor(id?: number, title?: string, active?: boolean, permission?: Permission) {
        this.id = id ?? 0;
        this.title = title ?? '';
        this.active = active ?? true;
        this.permission = permission ?? new Permission();
    }
}

export class Permission {
    @matInputDisable(true)
    id?:                        number;
    all?:                       boolean;
    readOrganizationUser?:      boolean;
    readOrganizationRole?:      boolean;
    readOrganizationProfile?:   boolean;
    readOrganizationSmtp?:      boolean;
    modifyOrganizationUser?:    boolean;
    modifyOrganizationRole?:    boolean;
    modifyOrganizationProfile?: boolean;
    modifyOrganizationSmtp?:    boolean;
    
    constructor(
        id?:                        number,
        all?:                       boolean,
        readOrganizationUser?:      boolean,
        readOrganizationRole?:      boolean,
        readOrganizationProfile?:   boolean,
        readOrganizationSmtp?:      boolean,
        modifyOrganizationUser?:    boolean,
        modifyOrganizationRole?:    boolean,
        modifyOrganizationProfile?: boolean,
        modifyOrganizationSmtp?:    boolean,
        ) {
        this.id =                        id ?? 0;
        this.all =                       all ?? true;
        this.readOrganizationUser =      readOrganizationUser ?? true;
        this.readOrganizationRole =      readOrganizationRole ?? true;
        this.readOrganizationProfile =   readOrganizationProfile ?? true;
        this.readOrganizationSmtp =      readOrganizationSmtp ?? true;
        this.modifyOrganizationUser =    modifyOrganizationUser ?? true;
        this.modifyOrganizationRole =    modifyOrganizationRole ?? true;
        this.modifyOrganizationProfile = modifyOrganizationProfile ?? true;
        this.modifyOrganizationSmtp =    modifyOrganizationSmtp ?? true;
    }
}

export interface SMTP {
    id?:       number;
    host?:     string;
    port?:     number;
    username?: string;
    password?: string;
}

export class User {
    @matInputDisable(true)
    id?:          number;

    @matInputHide(true)
    userProfile?: UserProfile;
    defineRole?:  Role[];

    constructor(id?: number, userProfile?: UserProfile, defineRole?: Role[]) {
        this.id = id;
        this.userProfile = userProfile ?? new UserProfile();
        this.defineRole = defineRole ?? [new Role()] as Role[];
        Object.setPrototypeOf(this.defineRole, Role);
    }
}

export class UserProfile {
    @matInputDisable(true)
    id?:        number;
    alias?:     string;
    firstName?: string;
    lastName?:  string;
    email?:     string;
    city?:      string;
    state?:     string;
    zip?:       number;

	constructor(id?: number, alias?: string, firstName?: string, lastName?: string, email?: string, city?: string, state?: string, zip?: number) {
        this.id = id ?? 0;
        this.alias = alias ?? '';
        this.firstName = firstName ?? '';
        this.lastName = lastName ?? '';
        this.email = email ?? '';
        this.city = city ?? '';
        this.state = state ?? '';
        this.zip = zip ?? 0;
	}
}