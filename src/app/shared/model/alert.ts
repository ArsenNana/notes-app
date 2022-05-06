export class Alert {
    id!: string;
    type!: AlertType;
    messsage!: string;
    autoClose!: boolean;
    keepAfterRouteChanges!: boolean;
    fade!: boolean;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }

}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}