import { NgModule } from '@angular/core';
import { AgentComponent } from './list/agent.component';
import { AgentFormComponent } from './form/agent-form.component';
import { AgentDetailsComponent } from './details/agent-details.component';
import { AgentRoutingModule } from './agent-routing.module';
import { MaterialModule } from '../../shared/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [ AgentRoutingModule, MaterialModule, CommonModule, FormsModule, ReactiveFormsModule ],
    declarations: [ AgentComponent, AgentFormComponent, AgentDetailsComponent ]
})
export class AgentModule {}
