import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  setloginFromStore(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  private name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private loggedin$ = new BehaviorSubject<boolean>(false);
  private userId$ = new BehaviorSubject<number>(0);
  private balance$ = new BehaviorSubject<number>(0);


  constructor() { }


  public getFullNameFromStore() {
    return this.name$.asObservable();

  }
  public setFullNameForStore(name: string) {
    this.name$.next(name);
  }
  public getRoleFromStore() {
    return this.role$.asObservable();

  }
  public setRoleForStore(role: string) {
    this.role$.next(role);
  }
  public getLoginFromStore() {
    return this.loggedin$.asObservable();

  }
  public setLoginForStore(loggedin: boolean) {
    this.loggedin$.next(loggedin);
  }

  public getUserIdFromStore() {
    return this.userId$.asObservable();

  }
  public setUserIdForStore(userId: number) {
    this.userId$.next(userId);
  }




}
