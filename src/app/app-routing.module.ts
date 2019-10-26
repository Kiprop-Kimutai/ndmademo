import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { RegionsComponent } from './pages/regions/regions.component';
import { RegionFormComponent } from './pages/regions/forms/region.form.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { CustomReuseStrategy } from './route-reuse-strategy';
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#AppLoginModule',
    data: {animation: 'Login'}
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    // data: {animation: 'Home'},
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {animation: 'Dashboard'},
        canActivate: [AuthGuardService]
      },
      {
        path: 'devices',
        loadChildren: './pages/devices/devices.module#DevicesModule'
      },
      {
        path: 'agents',
        loadChildren: './pages/agents/agent.module#AgentModule'
      },
      {
        path: 'beneficiaries',
        loadChildren: './pages/beneficiaries/beneficiaries.module#BeneficiariesModule'
      },
      {
        path: 'bulkoperations',
        children: [
          {
            path: 'upload',
            component: FileUploadComponent,
            data: {animation: 'Upload'}
          }
        ]
      },
      {
      path: 'regions',
      component: RegionsComponent,
      data: {animation: 'Regions'}
      },
      {
        path: 'regions/forms',
        component: RegionFormComponent,
        data: {animation: 'RegionForm', region: {}}
      },
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
