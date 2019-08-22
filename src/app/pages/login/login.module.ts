import { NgModule } from '@angular/core';
import { AppLoginComponent } from './login.component';
import { AppLoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../../shared/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [ AppLoginRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule,
               ],
    declarations: [ AppLoginComponent ],
    exports: []
})
export class AppLoginModule {}

