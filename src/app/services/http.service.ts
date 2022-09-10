import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    url = environment.apiUrl;
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

    get(path: string, params?: {}): any {
        const httOptions = {
            headers: new HttpHeaders({ }),
            params
        };
        return this.http.get(this.url + path, httOptions);
    }

    post(path: string, params: any, headers: boolean): any {
        if (headers) {
            const httOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'Application/json',
                    Authorization: this.getToken()
                })
            };
            return this.http.post(this.url + path, params, httOptions);
        } else {
            return this.http.post(this.url + path, params);
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
            return this.http.put(this.url + path, params, httOptions);
        } else {
            return this.http.put(this.url + path, params);
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

        return this.http.delete(this.url + path, httOptions);
    }

    download(path, params?: {}) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'Application/json',
                Authorization: this.getToken()
            }),
            params
        };
        return this.http.get(this.url + path, httpOptions);
    }
}
