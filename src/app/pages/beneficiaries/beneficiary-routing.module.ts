import { Routes, RouterModule } from '@angular/router';
import { BeneficiaryComponent } from './beneficiaries.component';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';
import { NgModule } from '@angular/core';
import { Beneficiary } from '../../models/beneficiary';
const routes: Routes = [
    {
        path: '',
        component: BeneficiaryComponent,
        data: {animation: 'BeneficiaryList'}
    },
    {
        path: 'details',
        component: BeneficiaryDetailsComponent,
        data: {}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BeneficiariesRoutingModule {}
