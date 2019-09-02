import { NgModule } from '@angular/core';
import { BeneficiariesRoutingModule } from './beneficiary-routing.module';
import { BeneficiaryComponent } from './beneficiaries.component';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';
import { MaterialModule } from '../../shared/app-material.module';
import { CommonModule } from '@angular/common';
import { AppFormsModule } from '../../shared/app-forms.module';
@NgModule({
    imports: [BeneficiariesRoutingModule, MaterialModule, CommonModule, AppFormsModule],
    declarations: [BeneficiaryComponent, BeneficiaryDetailsComponent]
})
export class BeneficiariesModule {}
