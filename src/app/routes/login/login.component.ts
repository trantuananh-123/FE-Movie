import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    socialUser!: SocialUser;
    currentUser!: SocialUser;
    isLoggedIn!: Boolean;

    constructor(private authService: SocialAuthService, private router: Router, private spinner: SpinnerService) { }

    ngOnInit(): void {
        this.spinner.hide();
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: any) => {
            console.log(data);
            this.currentUser = data;
            this.isLoggedIn = (this.currentUser != null);
            this.router.navigate(["/"]);
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
        });
    }

    signInWithFacebook(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data: any) => {
            console.log(data);
            this.currentUser = data;
            this.isLoggedIn = (this.currentUser != null);
            this.router.navigate(["/"]);
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
        });
    }

}
