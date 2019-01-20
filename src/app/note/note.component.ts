import { Component, ViewChild, OnInit,  ViewContainerRef } from '@angular/core';
import { Note } from './Note';
import { Color } from './Color';

import { ModalServiceService } from '../modal-service.service';
import { UserServiceService } from '../services/user-service.service';
import { ServiceSubscriber } from '../error-shower/error-subscriber';
import { Subject } from 'rxjs';
import { EditMenuActions } from '../edit-menu/editMenuActions';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent extends ServiceSubscriber implements OnInit {
  @ViewChild('noteEdit', {read: ViewContainerRef}) noteEdit;

  EditMenuSubscriber : Subject<number> = new Subject();

  Notes: Note[] = [];

  private CurrentlyEditing : Note;
  constructor(private modal : ModalServiceService, private UserServiceService : UserServiceService ) { super(modal)}
  
  
  showEditMenu(note){
    this.CurrentlyEditing = note;
    super.makeEditModal(this.noteEdit, note, this.EditMenuSubscriber);
}
  showAddMenu(){
    this.CurrentlyEditing = new Note();
    super.makeEditModal(this.noteEdit,this.CurrentlyEditing,this.EditMenuSubscriber);
  }
editMenuSubscribe() {
    this.EditMenuSubscriber.subscribe(e => {
        switch (e) {
          case EditMenuActions.Back : {
            console.log("BACK");
            super.destroyModal(this.noteEdit);
            break;
          }
          case EditMenuActions.ChangeColor : {
              console.log("CHANGE COLOR");
              break;
          }
          case EditMenuActions.Delete : {
              console.log("DELETING NOTE");
              if(this.CurrentlyEditing.NoteID!=null){
                  this.deleteNote(this.CurrentlyEditing);                
              }
              super.destroyModal(this.noteEdit);
              break;
          }
          case EditMenuActions.Save : {
            console.log("SAVING NOTE");
            this.updateNote();
            super.destroyModal(this.noteEdit);
            break;
          }
        }     
    })
  }

  ngOnInit() {
    this.loadNotes();
    this.editMenuSubscribe();
    this.addNoteSubscribe();
  }
  addNoteSubscribe(){
    this.UserServiceService.NewNoteEvent.subscribe(e=>{
      e == true ? this.showAddMenu() : this.loadNotes();
    });
  }
  loadNotes(){
    console.log("Loading");
    this.UserServiceService.loadNotes().subscribe(e=>this.mapNotes(e));    
  }
  mapNotes(notes : any){
    this.Notes = [];
      notes.map(e=>{
          var note = new Note(e.Content,new Color(e.R,e.G,e.B),e.NoteID);
          this.Notes.push(note);
          
        }        
      )
      console.log(this.Notes);
  }

   addNote(){
      this.UserServiceService.sendNote(this.CurrentlyEditing);
   }

  updateNote(){
    console.log("EDITING NOTE");
    if(this.CurrentlyEditing.NoteID!=null) 
          this.UserServiceService.updateNote(this.CurrentlyEditing);
        else{
          this.addNote();
        }
    
  }
  deleteNote(note : Note){
      console.log("ID NOTATKI");
      console.log(note);
      this.Notes.splice(this.Notes.indexOf(note),1);
      this.UserServiceService.deleteNote(note.NoteID);
  }

}
