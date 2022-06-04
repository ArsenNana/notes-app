import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model';
import { LoginDto } from '../model/loginDto';
import { SignedInUserDto } from '../model/SignedInUserDto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private http: HttpClient
  ) { }

  public register(user: User) {
    return this.http.post(environment.apiUrl + 'api/auth/signup', user);
  }

  public login(loginDto: LoginDto) {
    return this.http.post<SignedInUserDto>(environment.apiUrl + 'api/auth/signin', loginDto);
  }
}
