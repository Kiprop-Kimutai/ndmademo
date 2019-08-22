import {Component, OnInit, Input} from '@angular/core';
import {Menu} from '../../models/menus';
@Component({
  selector: 'app-navlist-component',
  templateUrl: './navlist.component.html',
  styleUrls: ['./layout.component.css']
})
export class NavListComponent implements OnInit {
  @Input() menu: Menu;
  showChildren = false;
  slidericon = 'caret_down';
  ngOnInit() {
  }
  showSubmenus() {
    this.showChildren = this.showChildren ? false : true;
    this.slidericon = this.slidericon === 'caret_down' ? 'caret_up' : 'caret_down';
  }
}
