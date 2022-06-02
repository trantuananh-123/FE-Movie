import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TokenStorageService } from "../authentication/token-storage.service";
import { catchError } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

const TOKEN_HEADER_KEY = "Authorization";
@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenStorageService, private toastr: ToastrService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token) });
        }
        return next.handle(authRequest).pipe(
            catchError(
                (err: any) => {
                    if (err.status === 401) {
                        if (!req.url.includes('/login')) {
                            this.toastr.error('Login to continue', 'Error');
                            this.router.navigate(['/login']);
                        }
                        return of(err);
                    }
                    throw err;
                }
            )
        )
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
