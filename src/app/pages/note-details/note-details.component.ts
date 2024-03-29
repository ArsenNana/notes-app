import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/model/note.model';
import { NotesService } from 'src/app/shared/service/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  noteIndex!: number;
  new!: boolean;
  title = "";
  body = "";

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // find out if  a new Note is about to be created or editing an existing one
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.title = this.notesService.get(params['id']).title;
        this.body = this.notesService.get(params['id']).body;
        this.noteIndex = params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    })
  }

  onSubmit(form: NgForm): void {
    if (this.new) {
      this.notesService.add(form.value);
    } else {
      this.notesService.update(this.noteIndex, form.value.title, form.value.body);
    }

    this.router.navigateByUrl('/noteList');
  }

  cancel() {
    this.router.navigateByUrl('/noteList');
  }

}
