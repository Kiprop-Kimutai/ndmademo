import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigs } from '../../shared/configs';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AgentService {
    API = this.configs.API;
    constructor( private http: HttpClient, private configs: AppConfigs) {

    }

    fetchAgents(): Observable<any> {
        return this.http.get(`${this.API}/agents`, {headers: {'Content-Type': 'application/json'}});
    }
    addAgent(agent): Observable<any> {
        return this.http.post(`${this.API}/agents`, agent, {headers: {'Content-Type': 'application/json'}} );
    }
    fetchOneAgent(id): Observable<any> {
        return this.http.get(`${this.API}/agents/${id}`, {headers: {'Content-Type': 'application/json'}});
    }
    updateAgent(id, agent): Observable<any> {
        return this.http.put(`${this.API}/agents/${id}`, agent, {headers: {'Content-Type': 'application/json'}});
    }
}
