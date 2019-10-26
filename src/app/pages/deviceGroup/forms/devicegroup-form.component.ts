import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegionsService } from '../../regions/regions.service';
import { DeviceService } from '../../devices/devices.service';
import { MessagingService } from '../../../shared/messaging.service';
@Component({
    selector: 'app-devicegroup-form-component',
    templateUrl: './devicegroup-form.component.html',
    styleUrls: ['./devicegroup-form.component.css']
})
export class DeviceGroupFormComponent implements OnInit {
    deviceGroupFormGroup: FormGroup;
    models = ['NewPOS 9220', 'NewPOS 8210', 'Saral Info'];
    versions = ['1.0.0', '1.0.1', '1.2.0', '1.2.1'];
    create: boolean;
    edit: boolean;
    regions = [];
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private regionService: RegionsService,
                private  deviceService: DeviceService, private messagingService: MessagingService, private router: Router) {}
    createDeviceGroup() {
        this.deviceGroupFormGroup = this.fb.group({
            name: new FormControl('', [Validators.required]),
            model: new FormControl('', [Validators.required]),
            firmware: new FormControl('', []),
            firmwareHistory: new FormControl('', []),
            regionId: new FormControl({})
        });
    }
    editDeviceGroup() {
        this.deviceGroupFormGroup = this.fb.group({
            name: new FormControl({value: '', disabled: true}, [Validators.required]),
            model: new FormControl({value: '', disabled: true}, [Validators.required]),
            firmware: new FormControl({value: ''}, []),
            firmwareHistory: new FormControl({value: '', disabled: true}),
            regionId: new FormControl({value: 0, disabled: true}),
            createdAt: new FormControl({disabled: true}, [Validators.required]),
            updatedAt: new FormControl({disabled: true}, [Validators.required]),
            id: new FormControl({value: 0, disabled: true})
        });
    }

    fetchRegions() {
        this.regionService.fetchRegions().subscribe( resp => {
            this.regions = resp.response_message;
        });
    }
    addDeviceGroup() {
        this.deviceService.addDeviceGroup(this.deviceGroupFormGroup.getRawValue()).subscribe( resp => {
            if (resp.response_status) {
                this.messagingService.alert('device group created successfuly');
                this.router.navigate(['/home/devices/groups']);
            } else {
                this.messagingService.alert('operation failed');
            }
        });
    }
    updateDeviceGroup() {
        // tslint:disable-next-line: radix
        this.deviceGroupFormGroup.get('regionId').patchValue(parseInt('2'));
        this.deviceService.editDeviceGroup(this.deviceGroupFormGroup.getRawValue()).subscribe( resp => {
            if (resp.response_status) {
                this.messagingService.alert('device group updated successfuly');
                this.router.navigate(['/home/devices/groups']);
            } else {
                this.messagingService.alert('operation failed');
            }
        });
    }
    onFirmwareSelect(event) {
        if (this.edit) {
        this.route.params.subscribe(data => {
            if (data.firmware !== event.value) {
                if (data.firmwareHistory === '') {
                    const firmwareHistory = [];
                    firmwareHistory.push(event.value);
                    this.deviceGroupFormGroup.get('firmwareHistory').patchValue(firmwareHistory.toString());
                } else {
                    const firmwareHistory = data.firmwareHistory.split(',');
                    // firmwareHistory.splice(0, 1);
                    firmwareHistory.push(event.value);
                    this.deviceGroupFormGroup.get('firmwareHistory').patchValue(firmwareHistory.toString());
                }
            }
        });
    } else {
        if (event.value !== null) {
            this.deviceGroupFormGroup.get('firmwareHistory').setValue(event.value);
        }
    }
    }
    ngOnInit() {
        this.route.params.subscribe(data => {
            if (Object.keys(data).length === 0) {
                this.createDeviceGroup();
                this.create = true;
            } else {
                this.editDeviceGroup();
                // tslint:disable-next-line: radix
                this.deviceGroupFormGroup.patchValue(data);
                this.edit = true;
            }
        });
        this.fetchRegions();
    }
}
