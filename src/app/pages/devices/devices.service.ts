import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigs } from '../../shared/configs';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { Device } from '../../models/device';
import { ApiResponse } from '../../models/apiresponse';
@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    API = this.appConfigs.API;
    constructor(private appConfigs: AppConfigs, private http: HttpClient, private authService: AuthService) {}

    fetchDevices(): Observable<any> {
        return this.http.get(`${this.API}/devices`, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
    }
    fetchOneDevice(id): Observable<any> {
        return this.http.get(`${this.API}/devices/${id}`, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
    }
    create(device: Device): Observable<any> {
        return this.http.post(`${this.API}/devices`, device, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
    }
    update(device: Device) {
        // tslint:disable-next-line: max-line-length
        return this.http.put<ApiResponse>(`${this.API}/devices/${device.id}`, device, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
    }
    delete(device: Device) {
        // tslint:disable-next-line: max-line-length
        return this.http.delete<ApiResponse>(`${this.API}/devices/${device.id}/${device.serialno}`,  {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
    }
}
