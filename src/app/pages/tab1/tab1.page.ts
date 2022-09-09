import {Component} from '@angular/core';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    space = {
        all: 240,
        used: 120,
        free: 120,
        percentage: 80
    };

    constructor() {
    }

}
