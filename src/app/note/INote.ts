import { IColor} from './IColor';

export interface INote{
    Date : Date;
    NoteID? : number;
    Color : IColor;
    Content : string;
    
    Height? : number;
    Width? : number;
    
    PosX? : number;
    PosY? : number;  
}

