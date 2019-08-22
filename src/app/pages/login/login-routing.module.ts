import { RouterModule, Routes, Router } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppLoginComponent } from './login.component';
const routes: Routes = [
    {
        path: '',
        component: AppLoginComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLoginRoutingModule {}
