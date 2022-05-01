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
    this.getAllNotes();
  }

  getAll(): Note[] {
    return this.notes;
  }

  getAllNotes(): void {
    this.http.get(environment.apiUrl + "getNotes").subscribe({
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

  add(note: Note): number {
    this.http.post<any>(environment.apiUrl + 'saveNote', note).subscribe({
      next: (value: any) => {
        console.log(`note saved => ${value}`);
      },
      error: (msg: any) => {
        throw new Error(msg);
      }
    });
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string): void {
    this.notes[id].title = title;
    this.notes[id].body = body;
    this.http.put(environment.apiUrl + 'updateNote', this.notes[id]).subscribe({
      next: (value: any) => {
        console.log(`note updated => ${value}`);
      },
      error: (msg: any) => {
        throw new Error(msg);
      }
    });
  }

  delete(id: number): void {
    this.notes.splice(id, 1);
    this.http.delete(environment.apiUrl + `deleteNote/id/${id}`).subscribe({
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
  }

}
