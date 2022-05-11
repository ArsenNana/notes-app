export class User {
    id!: number;
    username!: string;
    password!: string;
    passwordConfirmed!: string;
    firstName!: string;
    lanstName!: string;
    token!: string;

    constructor(id: number, username: string, password: string, firstName: string, lanstName: string) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lanstName = lanstName;
        this.password = password;

    }

    getFirstName(): string { return this.firstName; }
}