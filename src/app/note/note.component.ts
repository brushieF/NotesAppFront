import { Component, ViewChild, OnInit, ElementRef, ViewContainerRef, Type, ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { Note } from './Note';
import { Color } from './Color';
import { map } from 'rxjs/operators';



import {ColorPickerComponent} from '../color-picker/color-picker.component';
import { ModalServiceService } from '../modal-service.service';
import { EditMenuComponent } from '../edit-menu/edit-menu.component';
import { ComponentRef } from '@angular/core/src/render3';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @ViewChild('color', {read: ViewContainerRef}) color;


  Notes: Note[] = [];

  constructor(private componentFactoryResolver : ComponentFactoryResolver, private modalService : ModalServiceService, private UserServiceService : UserServiceService ) { }


  loadComponent(type, data?){
    let componentFactor = this.componentFactoryResolver.resolveComponentFactory(type);

    let viewContainter = this.color;
    viewContainter.clear();
    
    let componentRef  : ComponentRef<any> = viewContainter.createComponent(componentFactor);
    componentRef.instance._Note = data;

    componentRef.instance.getEventEmitter().subscribe(x=>viewContainter.clear());
    
  }
  showColorPicker(){
      this.loadComponent(this.modalService.getColorPicker());
  }
  showEditMenu(note){
    console.log(this);
    this.loadComponent(this.modalService.getEditMenu(),note);
}


  ngOnInit() {
    this.UserServiceService.loadNotes().subscribe(e=>this.mapNotes(e));
  }
  mapNotes(notes : any){
      notes.map(e=>{
        console.log(e);
          var note = new Note(e.Content,new Color(e.R,e.G,e.B),e.NoteID);
          this.Notes.push(note);
          console.log(note);
      }        
      )
      console.log(this.Notes);
  }
  ngAfterViewInit(): void {   
   // this.sendTest(); 
  }
 
  sendTest(){
    var note = new Note("dasd",new Color());
    this.UserServiceService.sendNote(note);
  }

  deleteNote(note : Note){
      console.log("ID NOTATKI");
      console.log(note);
      this.Notes.splice(this.Notes.indexOf(note),1);
      this.UserServiceService.deleteNote(note.NoteID);
  }

  log(e, i: Note) {
    i.addListeners();



  }
  log2(e, i: Note) {
        i.removeListeners();
  }

}
