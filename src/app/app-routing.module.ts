import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
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
        component: DashboardComponent,
        pathMatch: 'full'

      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
