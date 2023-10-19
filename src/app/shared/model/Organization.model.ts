import { MatColumn, addGetPrototype, matInputDisable, matInputRequire } from "./Mat.model";

export class Organization {
    id?:                  string;
    users?:               User[];
    roles?:               Role[];
    organizationProfile?: OrganizationProfile;
    smtp?:                SMTP;
}

export interface OrganizationProfile {
    id?:           number;
    publicEmail?:  string;
    bio?:          string;
    timeZone?:     string;
    socialMedias?: string[];
    name?:         string;
    address?:      string;
    city?:         string;
    state?:        string;
    zip?:          number;
}

export class Role {
    @matInputDisable(true)
    id?:         number;
    @matInputRequire(true)
    title?:      string;
    active?:     boolean;
    permission?: Permission;

    constructor(id?: number, title?: string, active?: boolean, permission?: Permission) {
        this.id = id ?? 0;
        this.title = title ?? '';
        this.active = active ?? true;
        this.permission = permission ?? new Permission();
    }

    static getDisplayColumns(): MatColumn[] {
        return [
            {
                index: 0
            },
            {
                index: 1
            },
            {
                index: 2
            }
        ]
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
    id?:          number;
    userProfile?: UserProfile;
    defineRole?:  Role[];

    constructor(id?: number, userProfile?: UserProfile, defineRole?: Role[]) {
        this.id = id;
        this.userProfile = userProfile ?? new UserProfile();
        this.defineRole = defineRole ?? [];
    }
}

export class UserProfile {
    id?:        number;
    alias?:     string;
    firstName?: string;
    lastName?:  string;
    email?:     string;
    city?:      string;
    state?:     string;
    zip?:       string;

	constructor(id?: number, alias?: string, firstName?: string, lastName?: string, email?: string, city?: string, state?: string, zip?: string) {
        this.id = id;
        this.alias = alias;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.state = state;
        this.zip = zip;
	}
}