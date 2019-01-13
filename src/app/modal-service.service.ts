import { ViewContainerRef,  ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { Injectable } from '@angular/core';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {EditMenuComponent} from './edit-menu/edit-menu.component';
import { ErrorShowerComponent } from './error-shower/error-shower.component';

@Injectable()

export class ModalServiceService {
  
    constructor(private componentFactoryResolver : ComponentFactoryResolver) {
      
    }

    loadError(viewContainter : ViewContainerRef, errorData : any){
   
    
      let componentFactor = this.componentFactoryResolver.resolveComponentFactory(ErrorShowerComponent);
       viewContainter.clear();
      let componentRef : ComponentRef<any> = viewContainter.createComponent(componentFactor);
      componentRef.instance.errorContent = errorData;
    }
    
    getColorPicker(){
      return ColorPickerComponent;
    }
    getEditMenu(){
      return EditMenuComponent;
    }
 
}
