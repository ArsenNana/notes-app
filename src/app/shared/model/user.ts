export class User {
    id!: number;
    username!: string;
    password!: string;
    firstname!: string;
    lanstname!: string;
    email!: string;
    token!: string;

    constructor(id: number, username: string, password: string, firstname: string, lanstname: string, email: string) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lanstname = lanstname;
        this.password = password;
        this.email = email;

    }
}