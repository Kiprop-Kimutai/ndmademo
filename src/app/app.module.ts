import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/app-material.module';
import { AppFormsModule } from './shared/app-forms.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavListComponent } from '../app/pages/layout/navlist.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent, DashboardComponent, LayoutComponent, NavListComponent, FileUploadComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, BrowserAnimationsModule, MaterialModule, AppFormsModule, HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
