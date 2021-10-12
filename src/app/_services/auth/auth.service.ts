import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, last, map } from 'rxjs/operators';
import { CurrentUser } from '../../_models/current-user'
import { BehaviorSubject, Observable, throwError } from "rxjs"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.url + '/auth/login';
  public currentUser: Observable<CurrentUser>;
  private currentUserSubject: BehaviorSubject<CurrentUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.loginUrl, 
    { email: email, password: password }).pipe(map(data => {
      const token = data.data.access_token;
      if(token) {
        let userData = data.data.user;
        const user: CurrentUser = {
          id: userData.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          roleId: userData.roleId,
          roleName: userData.roleName
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userToken', token);
        this.currentUserSubject.next(user);
        return token;
      }
    }));
  }

  public logout(): boolean {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
    return false;
  }
  
}
