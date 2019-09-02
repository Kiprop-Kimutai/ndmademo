import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#AppLoginModule'
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
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
            component: FileUploadComponent
          }
        ]
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
