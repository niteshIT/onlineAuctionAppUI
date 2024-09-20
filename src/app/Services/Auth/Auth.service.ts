import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/Environment/environment';
import { UserStoreService } from '../UserStore/UserStore.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apiUrl = `${environment.apiUrl}User/`;
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router, private userStore: UserStoreService) {
    this.userPayload = this.decodedToken();
    this.checkLoginStatus();
  }

  signUp(userobj: any) {
    return this.http.post<any>(this.apiUrl + ('register'), userobj)
  }

  logIn(loginobj: any) {
    return this.http.post<any>(this.apiUrl + ('login'), loginobj)
  }


  signOut() {
    localStorage.clear();
    // this.userStore.setloginForStore(false);
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken() {
    return localStorage.getItem('token')
  }
  isloggedIn() {
    return !!localStorage.getItem('token')
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private checkLoginStatus(): void {
    const isLoggedIn = !!localStorage.getItem('token');
    this.isLoggedInSubject.next(isLoggedIn);
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  getFullNameFromToken() {
    if (this.userPayload) {
      console.log(this.userPayload.unique_name)
      return this.userPayload.unique_name;
    }
  }
  getRoleFromToken() {
    if (this.userPayload) {
      console.log(this.userPayload.role)
      return this.userPayload.role;
    }
  }
  getIdFromToken(): number {
    if (this.userPayload) {
      console.log(this.userPayload.userid)
      return parseInt(this.userPayload.userid, 10);
    }
    return 0;
  }


}
