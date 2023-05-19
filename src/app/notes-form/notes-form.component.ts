import { Component, EventEmitter, Output } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteItem } from '../models/note-item';

@Component({
  selector: 'app-note-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css']
})
export class NotesFormComponent {
  note: NoteItem = new NoteItem();
  @Output() noteEvent = new EventEmitter();

  constructor(private service: NotesService, 
    private route: ActivatedRoute, private router: Router){
      this.refreshNotes();
  }

  refreshNotes() {
    let id: string | null = this.route.snapshot.paramMap.get('id'); 

    if(id && !isNaN(parseInt(id)))
      this.service.getNoteByID(parseInt(id))
        .subscribe(res => {
          this.note = res;
        })
  }

  onSubmit(form: NgForm) {
    if (this.note.id == 0) {
      this.insertRecord(this.note);
    } 
    else
      this.updateRecord(this.note); 
      
    this.resetForm(form);
  }

  insertRecord(note: NoteItem){
    this.service.createNote(note).subscribe();
  }

  updateRecord(note: NoteItem){    
    this.service.updateNote(note).subscribe();      
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.note = new NoteItem();
    this.noteEvent.emit();
    this.router.navigate(['/notes']);
  }
}
