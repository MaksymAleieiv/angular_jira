import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUserStoreService } from '../../store/current-user-store.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private currentUserStore: CurrentUserStoreService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.currentUserStore.token || localStorage.getItem('token');
      req = req.clone({
        url: environment.url + req.url,
        headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
      })
      console.log(req)
      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((err: HttpErrorResponse) => {
            console.log(err)
            if(err.status === 403 || err.status === 401) {
              this.currentUserStore.clearCurrentUser();
            }
            return throwError(() => err);
        })
      )
  }
}
