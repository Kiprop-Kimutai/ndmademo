import { Component, OnInit } from '@angular/core';
import { MenuService } from './layout.service';
import {Menu} from '../../models/menus';
@Component({
    selector: 'app-layout-component',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    sidenavMode = '';
    isSidenavOpened = true;
    loggedInuser = '';
    menus: Menu[];
    menu: Menu;
    constructor(private menusService: MenuService) {}
    loadSidenavProperties() {
        this.getScreenSize();
        this.sidenavMode = this.getScreenSize() < 820 ? 'over' : 'side';
        this.isSidenavOpened = this.getScreenSize() < 820 ? false : true;
      }
      getScreenSize(): number {
        return window.innerWidth;
      }
      loadMenus() {
        this.menusService.fetchMenus().subscribe(data => {this.menus = data; console.log(this.menus);});
      }
    ngOnInit() {
        this.loadSidenavProperties();
        this.loadMenus();
    }
}
