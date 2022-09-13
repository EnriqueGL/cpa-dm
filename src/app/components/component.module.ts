import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PipesModule } from '../pipes/pipes.module';

import { FiltrosComponent } from './modales/filtros/filtros.component';

@NgModule({
    entryComponents: [
        FiltrosComponent
    ],
    declarations: [
        FiltrosComponent
    ],
    exports: [
        FiltrosComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        PipesModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        CurrencyPipe
    ]
})
export class ComponentesModule { }
