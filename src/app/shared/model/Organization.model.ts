import { MatColumn } from "./Mat.model";

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
    id?:         number;
    title?:      string;
    active?:     boolean;
    permission?: Permission;

    constructor(id: number, title: string, active: boolean, permission: Permission) {
        this.id = id;
        this.title = title;
        this.active = active;
        this.permission = permission;
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
            },
            {
                index: 3,
                label: 'ok',
                getDisplayValueFn: (role: Role) => true
            }
        ]
    }
}

export interface Permission {
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