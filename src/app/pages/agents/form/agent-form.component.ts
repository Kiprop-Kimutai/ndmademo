import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AgentService } from '../../agents/agents.service';
import { Agent } from '../../../models/agent';
import { MatSelectChange } from '@angular/material';
import { MessagingService } from '../../../shared/messaging.service';
@Component({
    selector: 'app-agent-form-component',
    templateUrl: './agent-form.component.html',
    styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit {
    @Output() exitAgentForm = new EventEmitter<boolean>();
    agentFormGroup: FormGroup;
    agents: Agent[];
    msidns: Array<any>;
    constructor(private fb: FormBuilder, private agentService: AgentService, private messagingService: MessagingService,
                ) {
        this.createAgentFormGroup();
    }
    createAgentFormGroup() {
        this.agentFormGroup = this.fb.group({
            tillNumber: new FormControl('', [Validators.required]),
            msisdn: new FormControl('', [ Validators.required]),
            active: new FormControl(false, [Validators.required])
        });
    }
    fetchAgents() {
        this.agentService.fetchAgents().subscribe(resp => {
            console.log(resp);
            this.agents = resp.response_message;
            this.msidns = this.agents.map(agent => agent.msisdn);
            console.log(this.msidns);
        });
    }
    create() {
        this.agentService.addAgent(this.agentFormGroup.getRawValue()).subscribe(resp => {
            if (resp.response_status) {
                this.messagingService.alert('agent persisted successfuly');
                this.exitAgentForm.emit(true);
            } else {
            this.messagingService.alert('failed to add agent !');
            }
        });
    }
    cancel() {
        this.exitAgentForm.emit(true);
    }
    ngOnInit() {
        this.fetchAgents();
    }
}
