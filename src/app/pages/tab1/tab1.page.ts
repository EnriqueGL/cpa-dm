import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {HttpService} from '../../services/http.service';
import {FiltrosComponent} from '../../components/modales/filtros/filtros.component';
import {ModalController} from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    space;
    solicitudes;
    count;

    constructor(private utils: UtilsService, private http: HttpService, private modalController: ModalController,
                private router: Router) {
    }

    ngOnInit() {
        this.getStorage();
        // this.getSolicitudes({});
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
                this.utils.toast('error', jqXHR.message);
            }
        });
    }

    async doRefresh(event) {
        await this.getStorage();
        event.target.complete();
    }

    getSolicitudes(data) {
        this.http.post('app/queue', data).subscribe(res => {
            if (res.success) {
                this.solicitudes = res.queue;
                this.count = res.count;
            } else {
                this.utils.toast('error', res.message, 2500);
            }
        });
    }

    async openFiltros() {
        const modal = await this.modalController.create({
            component: FiltrosComponent,
            componentProps: { }
        });

        modal.onDidDismiss().then(data => {
            if (data.data) {
                this.getSolicitudes(data.data);
            }
        });

        await modal.present();
    }

    async goTo(id) {
        localStorage.setItem('id', id);
        await this.router.navigateByUrl('/tabs/tab2');
    }
}
