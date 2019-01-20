import { Component, OnInit} from '@angular/core';
import {Note } from '../note/Note';
import { EditMenuActions } from './editMenuActions';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})


export class EditMenuComponent implements OnInit {

 
  public EditMenuSubscriber : Subject<number>;
  public Note : Note;
  private _Note : Note;
  
  ngOnInit(){
    this._Note = new Note(this.Note.Content,this.Note.Color.newInstance());
    console.log(this.Note);
  }
 
  randomizeColors(){    
    this._Note.assignColors();
    this.EditMenuSubscriber.next(EditMenuActions.ChangeColor);
  }
  save(content : string){
    this.Note.Color = this._Note.Color;
    this.Note.Content = content;
    this.EditMenuSubscriber.next(EditMenuActions.Save);
  }
  back(){
    this.EditMenuSubscriber.next(EditMenuActions.Back);
  }
  deleteNote(){
    this.EditMenuSubscriber.next(EditMenuActions.Delete);
  }
 
 
}
