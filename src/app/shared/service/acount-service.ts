import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AcountService {

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User) {
    return this.http.post(environment.apiUrl + '/api/note/saveUser', user);
  }
}
