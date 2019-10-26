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

    fetchDeviceGroups(): Observable<any> {
        return this.http.get<ApiResponse>(`${this.API}/devicegroup`, {headers: { Authorization: `Bearer ${this.authService.getToken()}`}});
    }
    addDeviceGroup(deviceGroup): Observable<any> {
        return this.http.post<ApiResponse>(`${this.API}/devicegroup`, deviceGroup, {headers: {Authorization:
        `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'}});
    }
    editDeviceGroup(deviceGroup): Observable<any> {
        // tslint:disable-next-line: radix
        return this.http.put<ApiResponse>(`${this.API}/devicegroup/${parseInt(deviceGroup.id)}`, deviceGroup, {headers:
        {Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'}});
    }
    deleteDeviceGroup(deviceGroup): Observable<any> {
        return this.http.post<ApiResponse>(`${this.API}/devicegroup/${deviceGroup.id}`, deviceGroup, {headers:
        {Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'}});
    }
}
