import { Component, ViewChild, OnInit, ElementRef, ViewContainerRef, Type, ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { Note } from './Note';
import { Color } from './Color';



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

  createMockNotes() {   
    let note1 = new Note("abc");
    let note2 = new Note("abasdsac");
    note1.Height = 400;
    note1.Width = 200;

    note2.Width = 150;
    note2.Height = 200;

    
    this.Notes.push(note1);
    this.Notes.push(note2);
  }
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

  apiTest(){
    this.UserServiceService.testAPI();
  }
  ngOnInit() {
    this.createMockNotes();
  }
  ngAfterViewInit(): void {
    

    
  }
 

  log(e, i: Note) {
    i.addListeners();


  }
  log2(e, i: Note) {
        i.removeListeners();
  }

}
