import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AauthService {

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User) {
    return this.http.post(environment.apiUrl + 'api/auth/signup', user);
  }

  public login(username: string, password: string) {
    //return this.http.post(environment.apiUrl + 'api/auth/signin', user);
  }
}
