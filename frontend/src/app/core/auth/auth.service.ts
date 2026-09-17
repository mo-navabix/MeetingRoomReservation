import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginModel, LoginResponseModel } from '../../shared/models/auth/login.modal';
import { registerModel } from '../../shared/models/auth/register.modal';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginModel) {
    return this.http.post<LoginResponseModel>(`${environment.apiUrl}/auth/login`, data);
  }

  register(data: registerModel) {
    return this.http.post<registerModel>(`${environment.apiUrl}/auth/register`, data);
  }
}
