export interface Roles {
    admin?: boolean;
    customer?: boolean;
}

export class User {
    email;
    password;
    role: Roles;

    constructor (authData) {
        this.email = authData.email;
        this.password = authData.password;
    }
}
