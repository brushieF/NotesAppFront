import { IColor} from './IColor';

export interface INote{
    Date : Date;
   
    Color : IColor;
    Content : string;
    
    Height? : number;
    Width? : number;
    
    PosX? : number;
    PosY? : number;  
}

