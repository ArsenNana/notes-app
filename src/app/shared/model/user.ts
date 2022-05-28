export class User {
    id!: number;
    username!: string;
    password!: string;
    confirmPassword!: string;
    firstName!: string;
    lanstName!: string;
    email!: string;
    token!: string;

    constructor(id: number, username: string, password: string, firstName: string, lanstName: string, email: string) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lanstName = lanstName;
        this.password = password;
        this.email = email;

    }

    getFirstName(): string { return this.firstName; }
}