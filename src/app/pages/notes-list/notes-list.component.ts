import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/shared/model/note.model';
import { NotesService } from 'src/app/shared/service/notes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  //notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  @ViewChild('filterInput') filterInputElRef!: ElementRef<HTMLInputElement>;

  constructor(
    private notesService: NotesService,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    // this.notes = this.notesService.getAll();
    this.notesService.notesObservable.subscribe({
      next: (value: any) => {
        this.notesService.initNotes(value);
        this.filteredNotes = value
      },
      error: (err: any) => {
        throw new Error(err);
      }
    });
  }

  deleteNote(note: Note): void {
    this.notesService.delete(note.id);
    this.filter(this.filterInputElRef.nativeElement.value);
  }

  filter(event: any): void {
    let query;
    if (event.target) {
      query = event.target.value;
    } else {
      query = event;
    }
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    // split up the search query into idividual words
    let terms: string[] = query.split(' '); // splitt on space
    // remove duplicate search terms
    terms = this.removeDuplicates(terms);
    // compile all the relevant results into the allResults array
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      // append results to the allResults array
      allResults = [...allResults, ...results];

    });
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    // sort by relevancy
    this.sortByRelevancy(allResults);

  }

  removeDuplicates(terms: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    terms.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Note[] {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notesService.getAll().filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }

      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
    return relevantNotes;
  }

  /**
   * this method caculate the relevancy of a note based of the number of times
   * it appears in the search results
   */
  sortByRelevancy(searchResults: Note[]): void {

    let noteCountObj: any = {};
    searchResults.forEach(note => {
      let noteId = this.notesService.getId(note);

      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    });
    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];
      return bCount - aCount;
    });
  }

  generateNoteURL(note: Note): number {
    return this.notesService.getId(note);
  }

}


