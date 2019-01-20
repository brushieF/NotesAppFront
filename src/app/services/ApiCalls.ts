import { environment } from '../../environments/environment';


export const API = {
    Token : environment.baseUrl + "/Token",
    RegisterUser : environment.baseUrl + "/api/Account/Register",
    Notes : environment.baseUrl + "/api/Notes"
}
