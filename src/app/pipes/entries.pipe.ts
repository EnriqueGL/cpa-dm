import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'entries'
})
export class EntriesPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (value) {
            return Object.entries(value);
        }

        return [];
    }
}
