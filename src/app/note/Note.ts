import {INote} from './INote';
import { IColor } from './IColor';
import { Color } from './Color';


import { fromEvent, Subscription } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Observable } from 'rxjs';




export class Note implements INote{
    Date: Date;
    Color : IColor;
    
    

    Content: string;
    
    
    Height : number;
    Width : number;

    PosX : number;
    PosY : number;

    MousePosSubscription : Subscription;
    
    constructor(content : string, color : IColor = new Color()){

        this.Date = new Date();
        this.Color  = color;
        this.Content = content;       
    }

    getColor(){
        return this.Color.getMainColor();
    }
    getInverterdColor(){
        return this.Color.getInvertedColor();
    }
    assignColors(){
        this.Color.getRandomColor();
    }
    addListeners(){
        var a =  fromEvent(window, 'mousemove');
        var b = a.pipe(debounce(() =>timer(100)));
       

        this.MousePosSubscription = b.subscribe((res : MouseEvent)=>{
            this.log(res.clientX,res.clientY);
        });
    }

    removeListeners(){
        this.MousePosSubscription.unsubscribe();
        
        console.log("opuscil");
    }


    log(a : number, b: number){
        this.Content = a.toString();
        console.log("Pozycaj");
    }
    
    





}