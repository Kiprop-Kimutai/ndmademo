import { trigger, transition, useAnimation } from '@angular/animations';
import { routeAnimations } from './reusable-route-animations';
export const routeAnimation =
trigger('routeAnimations', [
    // transition('* <=> *', routeAnimations)
    transition('Dashboard <=> BeneficiaryList', routeAnimations),
    transition('Dashboard <=> Agent', routeAnimations),
    transition('BeneficiaryList <=> Agent', routeAnimations),
    transition('Dashboard <=> Upload', routeAnimations),
    transition('Agent <=> Regions', routeAnimations),
    transition('Regions <=> Regions', routeAnimations),
    transition('* <=> RegionForm', routeAnimations),
    transition('Regions <=> *', routeAnimations),
    transition('* <=> Upload', routeAnimations),
    transition('* <=> DeviceList', routeAnimations),
    transition('* <=> DeviceGroup', routeAnimations )
    // transition('* <=> *', routeAnimations)
    /*transition(':enter', useAnimation(routeAnimations)),
    transition(':leave', useAnimation(routeAnimations))*/
]);
