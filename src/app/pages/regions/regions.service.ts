import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigs } from '../../shared/configs';
import { Observable, ObservedValueOf } from 'rxjs';
import { Region } from 'src/app/models/region';
import { AuthService } from '../login/auth.service';
@Injectable({providedIn: 'root'})
export class RegionsService {
    API = this.appConfig.API;
    constructor(private http: HttpClient, private appConfig: AppConfigs, private authService: AuthService) {}

    fetchRegions(): Observable<any> {
        return this.http.get(`${this.API}/region`);
    }
    createRegion(region: Region): Observable<any> {
        return this.http.post(`${this.API}/region`, region, {headers: {Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'}});
    }
    updateRegion(region: Region): Observable<any> {
        return this.http.put(`${this.API}/region/${region.id}`, region, {headers: {Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'}});
    }
    deleteRegion(region: Region): Observable<any> {
        return this.http.delete(`${this.API}/region/${region.id}`, {headers: {Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'}});
    }
    fetchRegion(id: number): Observable<any> {
        return this.http.get(`${this.API}/region/${id}`, {headers: {Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'}});
    }
}

