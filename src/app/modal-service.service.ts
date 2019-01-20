import { ViewContainerRef,  ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { Injectable } from '@angular/core';
import {EditMenuComponent} from './edit-menu/edit-menu.component';
import { ErrorShowerComponent } from './error-shower/error-shower.component';
import { Note } from './note/Note';
import { Subject } from 'rxjs';

@Injectable()

export class ModalServiceService {
  
    constructor(private componentFactoryResolver : ComponentFactoryResolver) {
      
    }
    private loadComponent(viewContainter : ViewContainerRef, component : any) : ComponentRef<any>{
        let componentFactor = this.componentFactoryResolver.resolveComponentFactory(component);
        viewContainter.clear();
        let componentRef : ComponentRef<any> = viewContainter.createComponent(componentFactor);
     return componentRef;
    }

    loadError(viewContainter : ViewContainerRef, errorData : any){
       let componentRef = this.loadComponent(viewContainter,ErrorShowerComponent);   
        componentRef.instance.errorContent = errorData;
    }
    loadEditMenu(viewContainter : ViewContainerRef, note : Note, editMenuSubscriber : Subject<number>){
        let componentRef = this.loadComponent(viewContainter, EditMenuComponent)
        componentRef.instance.Note = note;
        componentRef.instance.EditMenuSubscriber = editMenuSubscriber;
    }
 
}
