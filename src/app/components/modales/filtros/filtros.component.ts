import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-filtros',
    templateUrl: './filtros.component.html',
    styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {

    ids = [];
    form: FormGroup;

    constructor(private modalController: ModalController, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        const filtros = JSON.parse(localStorage.getItem('filtros'));
        this.ids = filtros.ids

        this.form = this.formBuilder.group({
            grupo: [filtros?.grupo],
            estatus: [filtros?.estatus],
            producto: [filtros?.producto],
            tipo: [filtros?.tipo],
            tipo_documento: [filtros?.tipo_documento],
            error: [filtros?.error],
            ids: [''],
        });
    }

    async closeModal(update = false) {
        await this.modalController.dismiss();
    }

    async apply() {
        this.form.value.ids = this.ids;
        localStorage.setItem('filtros', JSON.stringify(this.form.value));
        await this.modalController.dismiss(this.form.value);
    }

    clear() {
        this.form.reset();
        this.ids = [];
    }

    clearFiltro(filtro) {
        this.form.controls[filtro].reset();
    }

    add() {
        this.ids.push(parseInt(this.form.value.ids));
        this.form.controls.ids.reset();
    }

    delete(idx) {
        this.ids.splice(idx,1);
    }
}
