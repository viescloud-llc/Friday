import { MatColumn, matInputDisable, matInputRequire } from "./Mat.model";

export interface Organization {
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
    @matInputDisable(true)
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

export interface User {
    id?:          number;
    userProfile?: UserProfile;
    defineRole?:  Role[];
}

export interface UserProfile {
    id?:        number;
    alias?:     string;
    firstName?: string;
    lastName?:  string;
    email?:     string;
    city?:      string;
    state?:     string;
    zip?:       string;
}