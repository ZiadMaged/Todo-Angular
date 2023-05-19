import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { NoteItem } from '../models/note-item';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: NoteItem[] = [];

  constructor(private service: NotesService){
    this.refreshNotes();
  }

  refreshNotes(){
    this.service.getNotes().subscribe((value) => {
      this.notes = value;
    })
  }

  onDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteNote(id)
      .subscribe( res => {
        this.refreshNotes();
      },
      err => {
        console.log(err);
      })
    }
  }
 
}
