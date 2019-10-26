import { Component, OnInit } from '@angular/core';
import { MenuService } from './layout.service';
import {Menu} from '../../models/menus';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from '../../shared/animations/route-animations';
// import { routeAnimations } from '../../shared/animations/route.animations';
import { ItemsRoutingService } from './layout-routing.service';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-layout-component',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    animations: [routeAnimation]
})
export class LayoutComponent implements OnInit {
    sidenavMode = '';
    isSidenavOpened = true;
    loggedInuser = '';
    menus: Menu[];
    menu: Menu;
    itemChange$: Observable<any>;
    routeTrigger$: Observable<any>;
    constructor(private menusService: MenuService, private itemsRouting: ItemsRoutingService) {
      this.itemChange$ = itemsRouting.itemChange$;
      this.routeTrigger$ = this.itemChange$;

    }
    loadSidenavProperties() {
        this.getScreenSize();
        this.sidenavMode = this.getScreenSize() < 820 ? 'over' : 'side';
        this.isSidenavOpened = this.getScreenSize() < 820 ? false : true;
      }
      getScreenSize(): number {
        return window.innerWidth;
      }
      loadMenus() {
        this.menusService.fetchMenus().subscribe(data => {this.menus = data; console.log(this.menus); });
      }
    ngOnInit() {
        this.loadSidenavProperties();
        this.loadMenus();
    }
    onMenuItemOpened(selectedMenu: Menu) {
        console.log(selectedMenu);
        this.menus.filter(menu => menu.name !== selectedMenu.name).forEach(menu => { menu.open = false; menu.caret = 'caret_down'; });
    }
    onAnimationEvent(event: AnimationEvent) {
    }
    prepareRoute(outlet: RouterOutlet) {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
