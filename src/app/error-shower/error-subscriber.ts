import { ModalServiceService } from '../modal-service.service';
import { ViewContainerRef } from '@angular/core';


export class ServiceSubscriber{
    constructor(private modalService? : ModalServiceService, private viewContainterRef? : ViewContainerRef){}

    makeErrorModal(errorData : any, errorContainter : ViewContainerRef){
        this.modalService.loadError(errorContainter,errorData);     
    }
    destroyErrorModal(errorContainter : ViewContainerRef){
        errorContainter.clear();
    }
}