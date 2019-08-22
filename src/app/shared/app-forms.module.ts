import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class AppFormsModule {}
