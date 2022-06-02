import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../core/model/movie';

const BASE_URL = "http://localhost:8888/api/v1/movie";
@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Movie[]> {
        return this.http.get<Movie[]>(BASE_URL + "/get-all");
    }

    getByGenre(genre: any): Observable<Movie[]> {
        return this.http.post<Movie[]>(BASE_URL + "/get-by-genre", genre);
    }

    save(body: any): Observable<any> {
        return this.http.post(BASE_URL + "/save", body);
    }

    getById(body: any): Observable<Movie> {
        return this.http.post<Movie>(BASE_URL + "/get-by-id/", body);
    }

    search(body: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/search", body);
    }
}
