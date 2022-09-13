import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    private loading: any;

    private colors = {
        success: 'primary',
        error: 'danger',
        warning: 'warning',
        info: 'secondary',
        light: 'light'
    };

    constructor(private loadingController: LoadingController, private alertController: AlertController, private toastController: ToastController,
                private router: Router) { }

    undefined(parametro) {
        return (
            typeof parametro === 'undefined' ||
            typeof parametro === undefined ||
            parametro === undefined ||
            parametro === '' ||
            parametro === null ||
            parametro === 'null'
        );
    }

    error(error) {
        let msgError = '';
        if (error === Object(error)) {
            for (const key in error) {
                msgError += error[key][0] + '<br>';
            }
        } else {
            msgError += error;
        }

        return msgError;
    }

    async message() {
        const loading = await this.loadingController.create({
            spinner: null,
            duration: 2500,
            mode: 'ios',
            message: `<div class="loader-container">
                        <div class="ion-text-center">
                            <img src="/assets/imgs/icons/icono-descargar-active.png" alt="">
                        </div>
                        <div class="message">
                            ¡Descarga realizada con éxito!
                        </div>
                      </div>`,
            cssClass: 'loaderInfo',
        });
        await loading.present();
    }

    async customMessage(title = '', subtitle = '') {
        const loading = await this.loadingController.create({
            spinner: null,
            duration: 1500,
            mode: 'ios',
            message: `<div class="loader-container">
                        <p class="message">${title}</p>
                        <p class="submessage">${subtitle}</p>
                      </div>`,
            cssClass: 'loaderMessage',
        });
        await loading.present();
    }

    async alert(text = 'Enter message here', subtext= '', callback = null, icon= 'checkmark-circle', color = 'primary') {
        const alert = await this.alertController.create({
            mode: 'ios',
            cssClass: 'customAlert',
            message: `<div class="loader-container">
                        <ion-icon name="${icon}" class="${color}"></ion-icon>
                        <p class="">${text}</p>
                        <p class="subtext">${subtext}</p>
                      </div>`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'cancel'
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        if (callback) {
                            callback();
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    async loader() {
        this.loading = await this.loadingController.create({
            spinner: null,
            mode: 'ios',
            message: `<div class="custom-spinner-container">
                        <div class="custom-spinner-box">
                            <img src="/assets/image/loaders/loader.gif"  alt="loader"/>
                        </div>
                    </div>`,
            cssClass: 'loader',
        });

        await this.loading.present();
    }

    async removeLoader() {
        await this.loadingController.dismiss();
    }

    async toast(type, message, time = 1000, close = false) {
        const buttons = [];
        if (close) {
            buttons.push({
                side: 'end',
                role: 'cancel',
                text: 'Aceptar',
            });
        }

        const toast = await this.toastController.create({
            message,
            color: this.colors[type],
            duration: time,
            buttons
        });

        await toast.present();
    }
}
