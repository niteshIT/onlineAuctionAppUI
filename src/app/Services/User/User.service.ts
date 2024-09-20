import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environment/environment';
import { User } from 'src/app/Models/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}User/`;

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + id)
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${userId}`, user);
  }

}
