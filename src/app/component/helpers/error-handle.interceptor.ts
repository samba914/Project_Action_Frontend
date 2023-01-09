import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {
  constructor(private router: Router,private storageService: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err =>{
        if(err instanceof HttpErrorResponse){
          if (err.status === 401) {
            this.storageService.clean();
            this.router.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    );
  }
}

export const ErrorHttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true },
];
