import { Component, OnInit, ComponentRef, Output, EventEmitter } from '@angular/core';
import {Note } from '../note/Note';
import { INote } from '../note/INote';
import { IColor } from '../note/IColor';


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})


export class EditMenuComponent implements OnInit, INote {
  Date: Date;
  Color : IColor;
  Content: string;

  @Output() public onDelete: EventEmitter<any> = new EventEmitter();
  
  public _Note : Note;
  content : string;
  private Note : Note;
  ngOnInit() {
    this.Note = new Note(this._Note.Content, this._Note.Color.newInstance());
    
   // this.Note = this._Note;
    this.assignValues();
  }
  assignValues(){
    
  }

  randomizeColors(){    
    this.Note.assignColors();
  }
  save(content : string){
    console.log("SAVING NOTE");
    console.log(content);
  }
  back(){
    console.log("BACK");
    this.destroy();
  }
  destroy(){
    this.onDelete.emit("DESTROYING EDIT MENU COMOPNENT");        
  }
  deleteNote(){
    this.destroy();
      console.log("DELETING NOTE");
  }
  getEventEmitter() : EventEmitter<any>{
    return this.onDelete;
  }
 
}
