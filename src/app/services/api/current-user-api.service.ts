import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiToken } from 'src/app/components/Interfaces/ApiToken';
import { CurrentUser } from 'src/app/components/Interfaces/CurrentUser';
import { LoginFormValues } from 'src/app/components/Interfaces/LoginFormValues';
import { RegistrationFormValues } from 'src/app/components/Interfaces/RegistrationFormValues';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserApiService {

  constructor(private http: HttpClient) {
    
  }

  login(credentials: LoginFormValues): Observable<ApiToken>{
    return this.http.post<ApiToken>('users/login', credentials).pipe();
  }

  registration(credentials: RegistrationFormValues): Observable<ApiToken> {
    return this.http.post<ApiToken>('users/registration', credentials).pipe();
  }

  fetchMe(): Observable<CurrentUser> {
    return this.http.post<CurrentUser>('users/me', {}).pipe();
  }
}
