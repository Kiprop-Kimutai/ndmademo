import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigs } from '../../shared/configs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = this.configs.API;
    private token: string;
    constructor(private http: HttpClient, private configs: AppConfigs) {}
    login(loginData): Observable<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.post(`${this.url}/users/login`, loginData, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(
            (data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                    return data;
                }
                return '';
            }
        ));
    }
    private saveToken(token: string): void {
        sessionStorage.setItem('token', token);
        this.token = token;
    }
    public getToken(): string {
        if (!this.token) {
            this.token = sessionStorage.getItem('token');
        }
        return this.token;
    }
}

export interface TokenResponse {
    token: string;
}
