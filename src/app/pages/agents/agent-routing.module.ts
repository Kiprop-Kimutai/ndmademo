import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AgentComponent } from './list/agent.component';
import { AgentFormComponent } from './form/agent-form.component';
import { AgentDetailsComponent } from './details/agent-details.component'
const routes: Routes = [
    {
        path: '',
        component: AgentComponent
    },
    {
        path: ':id',
        component: AgentDetailsComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgentRoutingModule {}
