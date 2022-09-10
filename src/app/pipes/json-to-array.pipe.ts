import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'jsonToArray'
})
export class JsonToArrayPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (value) {
            const data = JSON.parse(value);

            if (data.constructor === Array) {
                return data;
            } else {
                return Object.values(data);
            }
        }

        return [];
    }
}
