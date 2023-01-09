import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const JWT_TOKEN = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(data: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(data));
    window.sessionStorage.removeItem(JWT_TOKEN);
    window.sessionStorage.setItem(JWT_TOKEN,data.token);

  }
  public getToken(): any{
     const token =window.sessionStorage.getItem(JWT_TOKEN);
     if(token && token != null && token != ""){
       return token;
     }
     return null;
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
