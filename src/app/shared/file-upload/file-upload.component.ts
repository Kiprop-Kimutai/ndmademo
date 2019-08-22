import {Component, OnInit, Input} from '@angular/core';
import {FileUploadService} from './fileuploadservice';
import {FileUpload} from '../../models/file';
import {HttpEventType} from '@angular/common/http';
import {MessagingService} from '../../shared/messaging.service';
import {ApiResponse} from '../../models/apiresponse';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _gap = 50;
  gap = `${this._gap}px`;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;
  col3 = `1 1 calc(33.3333% - ${this._gap / 1.5}px)`;
    @Input() route: string;
    uploadedFile: File;
    validFile = false;
    uploadedFileDetails: FileUpload = {name: '', type: '', md5sum: ''};
    hideProgress = true;
    enableOpacity = false;
    uploadForm: FormGroup;
    value = 0;
    color = 'primary';
    mode = 'determinate';
    bufferValue = 100;

    options: any = [
        {code: 'agents', name: 'Agents'},
        {code: 'beneficiaries', name: 'Beneficiaries'},
        {code: 'devices', name: 'Devices'},
        {code: 'accessories', name: 'Accessories'},
        {code: 'cycles', name: 'Cycles'}
    ];
    // apiResponse: ApiResponse = new ApiResponse(false, 0, 'false');
    constructor(private fileUploadService: FileUploadService, private router: Router,
                private fb: FormBuilder, private messagingService: MessagingService) {
                    this.uploadForm = this.fb.group({
                        route: new FormControl('', [Validators.required])
                    });
                }

    onFileUpload(event) {
        this.uploadedFile =  event.target.files[0] as File;
        this.uploadedFileDetails.name = this.uploadedFile.name;
        this.uploadedFileDetails.type = this.uploadedFile.type;
        console.log(this.uploadedFile.type);
        if (this.uploadedFile.type !== 'text/csv') {
            this.messagingService.alert('file must be of type .csv');
        } else {
          this.validFile = true;
        }
        this.uploadedFileDetails.md5sum = '';

    }
    uploadFile() {
      this.hideProgress = false;
      this.enableOpacity = true;
      const route = this.uploadForm.getRawValue();
      this.value = 0;
      this.fileUploadService.uploadFile(this.uploadedFile, this.uploadedFile,
          route.route).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.value = Math.round(event.loaded / event.total * 100);
                console.log('upload progress ' + Math.round(event.loaded / event.total * 100) + '%');
            } else if (event.type === HttpEventType.Response) {
                console.log(event.body);
                this.hideProgress = true;
                this.enableOpacity = false;
                const key = 'response_message';
                const response = event.body as ApiResponse;
                this.messagingService.alert(response.response_message);
            }
        });

      }
    ngOnInit() {

    }
  cancel() {
    this.router.navigate(['/home/']);
  }
}