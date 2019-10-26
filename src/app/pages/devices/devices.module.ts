import { NgModule } from '@angular/core';
import { DevicesComponent } from './list/devices.component';
import { CreateDeviceFormComponent } from './form/create-device.component';
import { DeviceDetailsComponent } from './details/device-details.component';
import { DeviceGroupComponent } from '../deviceGroup/device-group.component';
import { DeviceGroupFormComponent } from '../deviceGroup/forms/devicegroup-form.component';
import { DevicesRoutingModule } from './devices-routing.module';
import { MaterialModule } from '../../shared/app-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [DevicesRoutingModule, MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [DevicesComponent, CreateDeviceFormComponent, DeviceDetailsComponent,
                   DeviceGroupComponent, DeviceGroupFormComponent]
})
export class DevicesModule {}
