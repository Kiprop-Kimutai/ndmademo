import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../../models/device';
import { ApiResponse } from '../../../models/apiresponse';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from '../devices.service';
import { MessagingService } from '../../../shared/messaging.service';
@Component({
    selector: 'app-device-details-component',
    templateUrl: './device-details.component.html',
    styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
    device: Device;
    deviceFormGroup: FormGroup;
    render = false;
    groups = ['uat', 'demo', 'actiondesk'];
    firmware = ['1.0.0', '1.1.3', '1.2.0', '2.0.0'];
    kernels = ['1.1.3-aa', '1.2.3', '1.2.3-aa', '1.2.5-aa'];
    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private deviceService: DeviceService,
                private messagingService: MessagingService) {
        this.createDeviceFormGroup();
    }
    createDeviceFormGroup() {
        this.deviceFormGroup = this.fb.group({
            id: new FormControl([Validators.required]),
            serialno: new FormControl({value: '', disabled: true}, [Validators.required]),
            model: new FormControl({value: '', disabled: true}, [ Validators.required]),
            kernel: new FormControl('', [Validators.required]),
            group: new FormControl('', [Validators.required]),
            firmware: new FormControl('', []),
            assigned_firmware: new FormControl('', []),
            active: new FormControl(false, [Validators.required]),
            agentId: new FormControl(0, [Validators.required]),
            createdAt: new FormControl(),
            updatedAt: new FormControl(),
            accessories: new FormArray([
                new FormGroup({
                    id: new FormControl(),
                    active: new FormControl(),
                    attachmentHistory: new FormControl(),
                    deviceId: new FormControl(),
                    issued: new FormControl(),
                    model: new FormControl(),
                    serialno: new FormControl(),
                    createdAt: new FormControl(),
                    updatedAt: new FormControl()
                })
            ])
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
    canUpdateDeviceDetails() {
        if (this.deviceFormGroup.status === 'VALID' && this.deviceFormGroup.touched === true
        && this.deviceFormGroup.dirty) {
            console.log(this.deviceFormGroup.getRawValue());
            return true;
        } else {
        }
    }
    update() {
        this.deviceService.update(this.deviceFormGroup.getRawValue()).subscribe(resp => {
            console.log(resp);
            if (resp.response_status) {
                this.router.navigate(['/home/devices/list']);
            } else {
                this.messagingService.alert('failed to update device.');
            }
        });
    }
    delete() {
        this.messagingService.confirm('confirm delete action?').subscribe(res => {
            console.log(res);
            if (res) {
                this.deviceService.delete(this.deviceFormGroup.getRawValue()).subscribe(resp => {
                    console.log(resp);
                    if (resp.response_status) {
                        this.router.navigate(['/home/devices/list']);
                    } else {
                        this.messagingService.alert('could not delete device.');
                    }
                });
            }
        });
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.fetchDevice(id);
    }
}
