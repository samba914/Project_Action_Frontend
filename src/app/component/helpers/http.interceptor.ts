import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router,private storageService: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.storageService.getToken();
    if(token !=null){
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) ,withCredentials: true,});
    }else{
      req = req.clone({withCredentials: true,});
    }
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
