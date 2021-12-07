import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
    constructor(
        private http: HttpClient
    ) { }

    get<T>(path: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        options = options || {};
        this.decorateOptions(options);
        return this.http.get<T>(this.getUrl(path), options);
    }

    post<T>(path: string, body: any, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        options = options || {};
        this.decorateOptions(options);
        return this.http.post<T>(this.getUrl(path), body, options);
    }

    delete<T>(path: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        options = options || {};
        this.decorateOptions(options);
        return this.http.delete<T>(this.getUrl(path), options);
    }

    private getUrl(path: string): string {
        return `${environment.apiEndpoint}${path}`;
    }

    private decorateOptions(options: any): void {
        if (!options.headers) {
            options.headers = new HttpHeaders();
        }
        options.headers = options.headers.set('Content-Type', 'application/json');
    }
}
