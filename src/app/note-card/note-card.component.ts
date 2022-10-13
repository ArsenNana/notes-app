import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title!: string;
  @Input() body!: string;
  @Input() link!: number;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator')
  truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText')
  bodyText!: ElementRef<HTMLElement>;


  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  ngAfterViewInit(): void {
    // work out if there is a text overflow and if not, then hide the cardtruncator
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick(): void {
    this.deleteEvent.emit();
  }

}
