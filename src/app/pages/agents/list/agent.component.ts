import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agents.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { paginatorFunction } from '../../../shared/paginator.function';
import {PageEvent} from '@angular/material/typings/esm5/paginator';
import { Agent } from '../../../models/agent';
import { Router } from '@angular/router';
let queryString = '';
@Component({
    selector: 'app-agent-component',
    templateUrl: './agent.component.html',
    styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
    pageEvent: PageEvent;
    agents: Agent[];
    agentsCopy: Agent[];
    editMode: any = false;
    columns: any;
    response: any = {};
    displayedColumns: string[] = ['id', 'tillnumber', 'msisdn', 'active', 'createdAt', 'devices'];
    dataSource = new MatTableDataSource<Agent>();
    pageSize: number;
    $data: any;
    isEdit = false;
    dataLength: number;
    createNewAgent = false;
    constructor( private agentService: AgentService, private router: Router) {}
    getAgents() {
        this.agentService.fetchAgents().subscribe(data => {
          this.response = data;
          if (this.response.response_status === true) {
            this.agents = data.response_message;
            this.agentsCopy = data.response_message;
            this.dataLength = data.response_message.length;
            this.dataSource = new MatTableDataSource(this.agents);
            this.pageSize = 10;
          }
        }, error => {
          console.log('error', error);
        });
    }
    paginateValues(pageSize: number, pageIndex: number) {
        this.agents = paginatorFunction(this.agentsCopy, pageSize, pageIndex) as Agent[];
      }
      private filterAgents(text: string) {
        queryString = text;
        if (text.trim().length > 0) {
        this.agents = this.agents.filter(this.filterAgent);
        } else {
            this.agents = this.agentsCopy;
        }
    }
    private filterAgent(agent: Agent): any {
    const patt = new RegExp(queryString, 'i');
    if (patt.test(agent.tillNumber) || patt.test('' + agent.id) || patt.test(agent.msisdn) ||
        patt.test(agent.msisdn) || patt.test('' + agent.active) ||
        patt.test(JSON.stringify(agent.devices)) ||  patt.test('' + agent.createdAt)) {
        return agent;
    }
    return;
    }
    onRowClicked(agent) {
    this.router.navigate(['/home/agents/', agent.id]);
    }
    newAgent() {
    this.createNewAgent = true;
    }
    reduceDevicesForAgent(agent: Agent) {
      return agent.devices.map(device => device.serialno);
    }
    onFormExit(exit: boolean) {
    this.createNewAgent = !exit;
    }
    ngOnInit() {
        this.getAgents();
    }
}
