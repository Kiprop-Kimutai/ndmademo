import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../../models/device';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DeviceService } from '../devices.service';
@Component({
    selector: 'app-device-details-component',
    templateUrl: './device-details.component.html',
    styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
    device: Device;
    deviceFormGroup: FormGroup;
    render = false;
    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private deviceService: DeviceService) {
        this.createDeviceFormGroup();
    }
    createDeviceFormGroup() {
        this.deviceFormGroup = this.fb.group({
            serialno: new FormControl('', [Validators.required]),
            model: new FormControl('', [ Validators.required]),
            kernel: new FormControl('', [Validators.required]),
            group: new FormControl('', [Validators.required]),
            firmware: new FormControl('', []),
            assigned_firmware: new FormControl('', []),
            active: new FormControl(false, [Validators.required]),
            agentId: new FormControl(0, [Validators.required])
        });
    }
    getStyleForDevice(): {} {
        let obj = {};
        if (this.device.active) {
          obj = {fill: 'lightgreen', 'fill-opacity': 'initial'};
        } else {
          obj = {fill: 'yellow'};
        }
        return obj;
    }
    fetchDevice(id) {
        this.deviceService.fetchOneDevice(id).subscribe(resp => {
            if (resp.response_status) {
                this.device   = resp.response_message;
                this.deviceFormGroup.patchValue(this.device);
                this.render = true;
            }
        });
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.fetchDevice(id);
    }
}
