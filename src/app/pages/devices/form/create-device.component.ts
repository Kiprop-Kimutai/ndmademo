import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AgentService } from '../../agents/agents.service';
import { Agent } from '../../../models/agent';
import { MatSelectChange } from '@angular/material';
import { MessagingService } from '../../../shared/messaging.service';
import { DeviceService } from '../devices.service';
@Component({
    selector: 'app-device-form-component',
    templateUrl: './create-device.component.html',
    styleUrls: ['./create-device.component.css']
})
export class CreateDeviceFormComponent implements OnInit {
    @Output() exitDeviceForm = new EventEmitter<boolean>();
    deviceFormGroup: FormGroup;
    groups = ['uat', 'demo', 'actiondesk'];
    firmware = ['1.0.0', '1.1.3', '1.2.0', '2.0.0'];
    kernels = ['1.1.3-aa', '1.2.3', '1.2.3-aa', '1.2.5-aa'];
    agents: Agent[];
    msidns: Array<any>;
    constructor(private fb: FormBuilder, private agentService: AgentService, private messagingService: MessagingService,
                private deviceService: DeviceService) {
        this.createDeviceFormGroup();
    }
    createDeviceFormGroup() {
        this.deviceFormGroup = this.fb.group({
            serialno: new FormControl('', [Validators.required]),
            model: new FormControl('', [ Validators.required]),
            kernel: new FormControl('', [Validators.required]),
            group: new FormControl('', [Validators.required]),
            firmware: new FormControl('', []),
            assigned_firmware: new FormControl('', []),
            active: new FormControl(false, [Validators.required]),
            agentId: new FormControl(0, [Validators.required])
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
    setAgentId(msisdn: MatSelectChange) {
        console.log(msisdn);
        this.deviceFormGroup.get('agentId').setValue((this.agents.filter(agent => agent.msisdn === msisdn.value))[0].id);
    }
    create() {
        this.deviceService.create(this.deviceFormGroup.getRawValue()).subscribe(resp => {
            if (resp.response_status) {
                this.messagingService.alert('device persisted successfuly');
                this.exitDeviceForm.emit(true);
            } else {
            this.messagingService.alert('failed to add device !');
            }
        });
    }
    ngOnInit() {
        this.fetchAgents();
    }
}
