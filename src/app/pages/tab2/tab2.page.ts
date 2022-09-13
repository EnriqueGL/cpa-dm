import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    segment = 'archivos';
    solicitud: any;
    header: any;

    constructor(private utils: UtilsService, private http: HttpService) {
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.solicitud = null;
        this.header = null;
        const id = localStorage.getItem('id');
        if (id) {
            this.getSolicitud(id);
        }
    }

    getSolicitud(id) {
        this.http.get('app/request-id/'+id, {}).subscribe(res => {
            if (res.success) {
                this.solicitud = res.data;
                this.header = res.header;
            } else {
                this.utils.toast('error', res.message);
            }
        }, jqXHR => {
            this.utils.removeLoader();
            if (jqXHR.status === 401) {
                this.utils.toast('error', 'Usuario no autorizado');
            }
        });
    }

    //https://facreview.cpavision.mx/descarga-masiva/send-solicitud/92350
    async confirmar(id) {
        await this.utils.alert(
            'Estas Seguro de querer ejecutar esta solicitud',
            'Pondrá a la solicitud con alta prioridad',
            () => {
                this.http.get(`descarga-masiva/send-solicitud/${id}`, {}, 1).subscribe(res => {
                    console.log(res);
                    this.utils.alert('success', res.message());
                });
            }, 'warning', 'warning');
    }
}
