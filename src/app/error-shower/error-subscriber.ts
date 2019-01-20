import { ModalServiceService } from '../modal-service.service';
import { ViewContainerRef } from '@angular/core';
import { Note } from '../note/Note';
import { Subject } from 'rxjs';


export class ServiceSubscriber{
    constructor(private modalService? : ModalServiceService, private viewContainterRef? : ViewContainerRef){}

    makeErrorModal(errorData : any, errorContainter : ViewContainerRef){
        this.modalService.loadError(errorContainter,errorData);     
    }
    makeEditModal(container : ViewContainerRef, note : Note, editMenuSubscriber : Subject<number>){
        this.modalService.loadEditMenu(container, note, editMenuSubscriber);
    }
    destroyErrorModal(errorContainter : ViewContainerRef){
        errorContainter.clear();
    }
    destroyEditModal(container : ViewContainerRef){
        container.clear();
    }
}