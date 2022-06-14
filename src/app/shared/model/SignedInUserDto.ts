import { Note } from "./note.model";

export class SignedInUserDto {
    id!: number;
    notes!: Array<Note>;
    jwtToken!: string;
}