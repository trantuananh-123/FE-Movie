import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "../authentication/token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";
@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token) });
        }
        return next.handle(authRequest);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
