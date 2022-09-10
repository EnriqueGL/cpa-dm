import {Component} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    segment = 'archivos';
    solicitud: any;

    constructor(private utils: UtilsService, private http: HttpService) {
    }

    getItem(form) {
        if (form.valid) {
            this.http.get('app/request-id/'+form.value.id, {}).subscribe(res => {
                if (res.success) {
                    this.solicitud = res.data;
                } else {
                    this.utils.toast('error', res.message);
                }
            }, jqXHR => {
                this.utils.removeLoader();
                if (jqXHR.status === 401) {
                    this.utils.toast('error', 'Usuario no autorizado');
                }
            });
        } else {
            this.utils.toast('warning', 'Id es requerido');
        }
    }

    segmentChanged(event) {

    }
}
