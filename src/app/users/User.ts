import {Token} from '../services/Token';

export class User{
        constructor(){}

     //   login : string;
        Email : string;
        Password : string;
        ConfirmPassword : string;
        
        Token : Token;

        stringify(){
                return JSON.stringify(this);
        }
}