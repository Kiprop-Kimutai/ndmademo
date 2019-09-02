import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigs } from '../../shared/configs';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class BeneficiariesService {
    API = this.configs.API;
    constructor( private http: HttpClient, private configs: AppConfigs) {

    }

    fetchBeneficiaries(): Observable<any> {
        return this.http.get(`${this.API}/beneficiaries`, {headers: {'Content-Type': 'application/json'}});
    }
    addBeneficiary(beneficiaries): Observable<any> {
        return this.http.post(`${this.API}/beneficiaries`, beneficiaries, {headers: {'Content-Type': 'application/json'}} );
    }
    fetchOneBeneficiary(id): Observable<any> {
        return this.http.get(`${this.API}/beneficiaries/${id}`, {headers: {'Content-Type': 'application/json'}});
    }
    updateAgent(id, beneficiary): Observable<any> {
        return this.http.put(`${this.API}/beneficiaries/${id}`, beneficiary, {headers: {'Content-Type': 'application/json'}});
    }
}
