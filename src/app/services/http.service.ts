import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    process = environment.process;
    fac = environment.fac;
    token = '';

    constructor(public http: HttpClient, private utils: UtilsService) {

    }

    getToken() {
        const token = localStorage.getItem('token');
        if (this.utils.undefined(token)) {
            return '';
        } else {
            return this.token = 'Bearer ' + token;
        }
    }

    get(path: string, params?: {}, endpoint = 0): any {
        const httOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'Application/json'
            }),
            params
        };
        return this.http.get((endpoint ? this.fac : this.process) + path, httOptions);
    }

    post(path: string, params: any, headers = true, endpoint = 0): any {
        if (headers) {
            const httOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'Application/json',
                    // Authorization: this.getToken()
                })
            };
            return this.http.post((endpoint ? this.fac : this.process) + path, params, httOptions);
        } else {
            return this.http.post((endpoint ? this.fac : this.process) + path, params);
        }
    }

    put(path: string, params: any, headers: boolean): any {
        if (headers) {
            const httOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'Application/json',
                    Authorization: this.getToken()
                })
            };
            return this.http.put(this.process + path, params, httOptions);
        } else {
            return this.http.put(this.process + path, params);
        }
    }

    delete(path: string, params?: {}): any {
        const httOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'Application/json',
                Authorization: this.getToken()
            }),
            body: params
        };

        return this.http.delete(this.process + path, httOptions);
    }

    download(path, params?: {}) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'Application/json',
                Authorization: this.getToken()
            }),
            params
        };
        return this.http.get(this.process + path, httpOptions);
    }
}
