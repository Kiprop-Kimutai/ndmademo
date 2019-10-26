import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {Menu} from '../../models/menus';
import { childMenuAnimation } from '../../shared/animations/child.menu.animation';
@Component({
  selector: 'app-navlist-component',
  templateUrl: './navlist.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [childMenuAnimation]
})
export class NavListComponent implements OnInit, OnChanges {
  @Input() menu: Menu;
  @Output() openMenuItem = new EventEmitter<Menu>();
  showChildren = false;
  slidericon = 'caret_down';

  showSubmenus() {
    this.menu.open = true;
    this.showChildren = this.showChildren ? false : true;
    this.menu.caret = this.menu.caret === 'caret_up' ? 'caret_down' : 'caret_up';
    if (this.menu.caret === 'caret_up') {
      this.showChildren = true;
    }
    this.toggleMenusVisiblity();
  }
  toggleMenusVisiblity() {
    this.openMenuItem.emit(this.menu);
  }
  ngOnChanges(change: SimpleChanges) {
  }
  ngOnInit() {
  }
}
