import { Component, OnInit } from '@angular/core';
import { ItemsRoutingService } from '../layout/layout-routing.service';
import { AuthGuardService } from '../../auth-guard.service';
@Component({
    selector: 'app-dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(itemsRouting: ItemsRoutingService, private authGuardService: AuthGuardService) {
        itemsRouting.itemChange$.next(Math.floor(Math.random() * 2));
    }

    ngOnInit(): void {
    }
}
