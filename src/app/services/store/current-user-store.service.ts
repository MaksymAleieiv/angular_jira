import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/components/Interfaces/CurrentUser';
import { CurrentUserApiService } from '../api/current-user-api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserStoreService {

  currentUser: CurrentUser | null = null;
  token: string | null = null;

  constructor(private currentUserApi: CurrentUserApiService, private router: Router) {}

  setToken(token: string) {
    if(token !== '') {
      this.token = token;
      localStorage.setItem('token', token);
      this.currentUserApi.fetchMe().subscribe({
        next: (res: any) => {
          this.setCurrentUser(res.user)
        },
        error: (err) => {
          console.log(err)
          this.clearCurrentUser();
        }
      })
    }
  }

  setCurrentUser(currentUser: CurrentUser) {
    this.currentUser = currentUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }

  getAuthFromLocalStorage() {
    try{
      this.setToken(localStorage.getItem('token') || '');
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{error: true}');
    }catch{

    }
  }

  clearCurrentUser() {
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login')
  }

  get isCurrentUserAdmin() {
    return this.currentUser?.role === 'ADMIN';
  }

}
