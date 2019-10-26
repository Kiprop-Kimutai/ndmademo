import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './list/devices.component';
import { DeviceDetailsComponent } from './details/device-details.component';
import { DeviceGroupComponent } from '../deviceGroup/device-group.component';
import { DeviceGroupFormComponent } from '../deviceGroup/forms/devicegroup-form.component';
import { DeviceGroup } from '../../models/devicegroup';
export const routes: Routes = [
    {
        path: 'list',
        component: DevicesComponent,
        data: {animation: 'DeviceList'}
    },
    {
        path: 'list/:id',
        component: DeviceDetailsComponent
    },
    {
        path: 'groups',
        component: DeviceGroupComponent,
        data: {animation: 'DeviceGroup'}
    },
    {
        path: 'groups/forms',
        component: DeviceGroupFormComponent,
        data: { }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevicesRoutingModule {}
