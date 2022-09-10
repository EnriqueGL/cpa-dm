import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    space;

    constructor(private utils: UtilsService, private http: HttpService) {
    }

    ngOnInit() {
        this.getStorage();
    }

    getStorage() {
        this.http.get('app/storage', {}).subscribe(response => {
            if (response.success) {
                this.space = response.storage;
            } else {
                this.utils.toast('error', response.message);
            }
        }, jqXHR => {
            if (jqXHR.status === 401) {
                this.utils.toast('error', 'Usuario no autorizado');
            } else {
                this.utils.toast('error', jqXHR.message)
            }
        });
    }

}
