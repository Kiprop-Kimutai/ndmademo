import { Component } from '@angular/core';
import { routeAnimation } from './shared/animations/route-animations';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation]
})
export class AppComponent {
  title = 'ndmademo';
  constructor() {}

  prepareRoute(outlet: RouterOutlet) {
   // return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    return outlet.activatedRouteData.animation;
  }
  onAnimationEvent(event: AnimationEvent) {
    console.log(event);
  }
}
