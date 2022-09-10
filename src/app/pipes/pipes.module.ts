import { NgModule } from '@angular/core';
import { JsonToArrayPipe } from './json-to-array.pipe';
import { EntriesPipe } from './entries.pipe';


@NgModule({
    declarations: [
        JsonToArrayPipe,
        EntriesPipe,
    ],
    imports: [],
    exports: [
        JsonToArrayPipe,
        EntriesPipe
    ],
    providers: [
        JsonToArrayPipe,
        EntriesPipe
    ],
})

export class PipesModule {

}
