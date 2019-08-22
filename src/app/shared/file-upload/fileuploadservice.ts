import { AppConfigs } from '../../shared/configs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileUpload} from '../../models/file';
@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
     // API = 'http://localhost:2000/api';
     // API = "/api";
     API = this.appConfig.API;
    constructor(private http: HttpClient, private appConfig: AppConfigs) {}

    uploadFile(file: File, uploadedfile: FileUpload, route) {
        const formData: any = new FormData();
        formData.append('uploads[]', file, file.name);
        formData.append('route', route);
        console.log(file);
        // tslint:disable-next-line: forin
        for (const key in uploadedfile) {
            formData.append(key, uploadedfile[key]);
        }
        const httpHeaders = new HttpHeaders({});
        return this.http.post(`${this.API}/files/uploadfile`, formData, {headers: httpHeaders,
            reportProgress: true, observe: 'events'});

    }

}
