import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './list/devices.component';
import { DeviceDetailsComponent } from './details/device-details.component';
export const routes: Routes = [
    {
        path: 'list',
        component: DevicesComponent
    },
    {
        path: 'list/:id',
        component: DeviceDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevicesRoutingModule {}
