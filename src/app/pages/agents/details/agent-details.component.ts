import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '../../../models/agent';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AgentService } from '../agents.service';
import { MessagingService } from '../../../shared/messaging.service';
@Component({
    selector: 'app-agent-details-component',
    templateUrl: './agent-details.component.html',
    styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {
    agent: Agent;
    agentFormGroup: FormGroup;
    render = false;
    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private agentService: AgentService,
                private messagingService: MessagingService) {
        this.createDeviceFormGroup();
    }
    createDeviceFormGroup() {
        this.agentFormGroup = this.fb.group({
            tillNumber: new FormControl('', [Validators.required]),
            msisdn: new FormControl('', [ Validators.required]),
            active: new FormControl(false, [Validators.required])
        });
    }
    fetchDevice(id) {
        this.agentService.fetchOneAgent(id).subscribe(resp => {
            if (resp.response_status) {
                this.agent   = resp.response_message;
                this.agentFormGroup.patchValue(this.agent);
                this.render = true;
            }
        });
    }
    update() {
        this.agentService.updateAgent(this.route.snapshot.paramMap.get('id'), this.agentFormGroup.getRawValue()).subscribe(resp => {
            if (resp.response_status) {
                this.messagingService.alert('agent updated successfuly');
                this.router.navigate(['/home/agents']);
            } else {
            this.messagingService.alert('failed to update agent !');
            }
        });
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.fetchDevice(id);
    }
}
