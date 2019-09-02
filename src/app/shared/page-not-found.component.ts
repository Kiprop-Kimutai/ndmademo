import { Component } from '@angular/core';

@Component({
    selector: 'app-page-not-found-component',
    template: `
    <div style = "position: relative;min-height:95vh; background-color: floralwhite">
    <div style = "position: relative; margin-top: 40vh;margin: auto; width: 20%;">
    <span style = "position: relative; margin:auto;text-align:center">Ooops! Page not found !</span>
    </div>
    </div>
    `
})
export class PageNotFoundComponent {
    constructor() {}
}
