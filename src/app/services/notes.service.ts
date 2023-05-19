import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NoteItem } from '../models/note-item';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  url: string = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  getNotes(): Observable<NoteItem[]>{
    return this.http.get<NoteItem[]>(this.url + "notes/");  
  }

  getNoteByID(id: number): Observable<NoteItem>{
    return this.http.get<NoteItem>(this.url + "notes/" + id);  
  }

  createNote(note: NoteItem): Observable<NoteItem>{
    let {id, ...noteObj} = note;
    return this.http.post<NoteItem>(this.url + "notes/", noteObj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }

  updateNote(note: NoteItem): Observable<NoteItem>{
    let {id, ...noteObj} = note;
    return this.http.put<NoteItem>(this.url + "notes/" + id, noteObj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }

  deleteNote(id: number): Observable<string>{
    return this.http.delete<string>(this.url + "notes/" + id);
  }
}
