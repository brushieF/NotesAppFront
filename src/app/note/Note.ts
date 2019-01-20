import {INote} from './INote';
import { IColor } from './IColor';
import { Color } from './Color';

export class Note implements INote{
    Date: Date;
    Color : IColor;
    
    NoteID : number;
    
    Content: string;
    
    
    Height : number;
    Width : number;

    
    constructor(content? : string, color : IColor = new Color(),noteID? : number){
        content == undefined  ? this.Content = "" : this.Content = content;
        this.Date = new Date();
        this.Color  = color;
        this.NoteID = noteID;       
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


    serialize() : string{
        var obj;
        if(this.NoteID==null) obj = { Content : this.Content, R : this.Color.R.toFixed(0), G : this.Color.G.toFixed(0), B : this.Color.B.toFixed(0)};
                        else  obj = { Content : this.Content, R : this.Color.R.toFixed(0), G : this.Color.G.toFixed(0), B : this.Color.B.toFixed(0), NoteID : this.NoteID};
        return JSON.stringify(obj);                             
    }




}