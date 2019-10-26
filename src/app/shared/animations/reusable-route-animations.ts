import { animation, style, query, group, animate, animateChild, transition } from '@angular/animations';
export const routeAnimations = [
    style({position: 'relative'}),
    query('* > :enter', [
        style({
            position: 'absolute',
            transform: 'translateY(-30%)'
        })
    ]),
    query(':enter > *', [
        style({transform: 'translateY(-100%)', opacity: 0})
    ]),
    query(':leave > *', animateChild(), {optional: true}),
    group([
        query(':leave > *', [
            animate('200ms', style({transform: 'translateY(30%)'}))
        ], {optional: true}),
        query(':enter > *', [
            animate('300ms', style({transform: 'translateY(-30%)'}))
        ])
    ]),
    query(':enter > *', animateChild())
];
