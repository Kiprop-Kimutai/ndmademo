import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule,
              MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatTooltipModule,
              MatProgressBarModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule,
              MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatTooltipModule,
              MatProgressBarModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {}
