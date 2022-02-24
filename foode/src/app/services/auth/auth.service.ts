import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // $apiUrl = '/api/';
  // $apiUrl = 'http://localhost:8080/api/';
  $apiUrl = 'http://localhost:8000/api/v1/';
  $authed = new EventEmitter<boolean>();

  constructor(private readonly http: HttpClient) {}

  getCurrentUser() {
    return window.sessionStorage.getItem('userId');
  }

  getCurrentUserName() {
    return window.sessionStorage.getItem('userName');
  }

  getCurrentUserType() {
    return window.sessionStorage.getItem('userType');
  }

  emitAuthState(val: boolean) {
    this.$authed.emit(val);
  }

  createUser(username: string, password: string, type: string):
      Observable<User> {
    const user = {'username': username, 'password': password, 'type': type};
    console.log('InService: ', user);
    return this.http.post<User>(`${this.$apiUrl}user/`, user);
  }

  authenticateUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.$apiUrl}user/?username=${username}`);
  }

  loginUser(user: User) {
    window.sessionStorage.setItem('userId', `${user.id}`);
    window.sessionStorage.setItem('userName', `${user.username}`);
    window.sessionStorage.setItem('userType', `${user.type}`);
    this.$authed.emit(true);
  }

  logoutUser() {
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('userName');
    window.sessionStorage.removeItem('userType');
  }
}
