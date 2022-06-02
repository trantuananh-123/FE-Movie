import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8888/api/v1";
const httpOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    userRole(): Observable<any> {
        const requestOptions: Object = {
            /* other options here */
            responseType: 'text'
        }
        return this.http.get<any>(BASE_URL + "/user/user", requestOptions);
    }

    signIn(username: any, password: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/user/sign-in", {
            username, password
        }, httpOption);
    }

    signInWithGoogle(token: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/oauth/google", {
            token
        }, httpOption);
    }

    signInWithFacebook(token: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/oauth/facebook", {
            token
        }, httpOption);
    }

    signUp(body: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/user/sign-up", body);
    }

    existedUsername(username: any): Observable<any> {
        return this.http.get<any>(BASE_URL + "/user/exist-username/" + username);
    }

    existedEmail(email: any): Observable<any> {
        return this.http.get<any>(BASE_URL + "/user/exist-email/" + email);
    }

    verify(body: any): Observable<any> {
        return this.http.post<any>(BASE_URL + "/verify", body);
    }
}
