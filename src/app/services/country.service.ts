import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8888/api/v1/country";
@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(BASE_URL + "/get-all");
    }

    save(body: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/save", body);
    }

    delete(body: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/delete", body);
    }
}
