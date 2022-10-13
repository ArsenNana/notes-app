import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();
  private notesSubject = new BehaviorSubject<any>(0);
  public notesObservable: Observable<Note[]> = this.notesSubject.asObservable();
  constructor(private http: HttpClient) {
    //this.getAllNotes();
  }

  getAll(): Note[] {
    return this.notes;
  }

  getAllNotes(): void {
    this.http.get(environment.apiUrl + "api/note/getNotes").subscribe({
      next: (value: any) => {
        this.notes = value;
        this.notesSubject.next(this.notes);
      },
      error: (msg: any) => {
        throw new Error(msg);
      }
    });
  }

  get(id: number): Note {
    return this.notes[id];
  }

  getId(note: Note): number {
    return this.notes.indexOf(note);
  }

  add(note: Note): void {
    this.http.post<any>(environment.apiUrl + 'api/note/saveNote', note).subscribe({
      next: (value: any) => {
        console.log(`note saved => ${value}`);
        // this.notesSubject.value.push(value);
        this.notes.push(note);
      },
      error: (msg: any) => {
        throw new Error(msg);
      }
    });
    // let newLength = this.notes.push(note);
    // let index = newLength - 1;
    // return index;
  }

  update(noteIndex: number, title: string, body: string): void {
    const note = new Note(this.notes[noteIndex].id, title, body);
    this.http.put(environment.apiUrl + 'api/note/updateNote', note).subscribe({
      next: (value: any) => {
        console.log(`note updated => ${value}`);
        // this.notes[noteIndex].title = value.title;
        // this.notes[noteIndex].body = value.body;
        this.notesSubject.value[noteIndex].title = value.title;
        this.notesSubject.value[noteIndex].body = value.body;
      },
      error: (msg: any) => {
        throw new Error(msg);
      }
    });
  }

  delete(noteIndex: number): void {
    const note = this.notes[noteIndex];
    this.notes.splice(noteIndex, 1);
    this.http.delete(environment.apiUrl + `api/note/deleteNote/id/${note.id}`).subscribe({
      next: (value: any) => {
        console.log(`note deleted => ${value}`);
      },
      error: (msg: any) => {
        throw new Error(msg);
      }
    });
  }

  initNotes(notes: Note[]): void {
    this.notes = notes;
    this.notesSubject.next(this.notes);
  }

}
