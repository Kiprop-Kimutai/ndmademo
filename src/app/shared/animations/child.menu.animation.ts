import { trigger, transition, animation, animate, style, query, stagger } from '@angular/animations';
export const childMenuAnimation = trigger('childMenu', [
    transition(':enter', [
        query('a', [
            style({opacity: 0, transform: 'translateY(-10%)'}),
            stagger(-30, [
                animate('500ms', style({opacity: 1, transform: 'none'}))
            ])
        ])
    ]),
    transition(':leave', [
        animate('500ms', style({transform: 'translateY(-10%)', height: 0, opacity: 0}))
    ])
]);

