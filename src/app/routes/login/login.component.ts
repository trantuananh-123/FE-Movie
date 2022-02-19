import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  socialUser!: SocialUser;
  currentUser!: SocialUser;
  isLoggedIn!: Boolean;

  constructor(private authService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((data: any) => {
      this.currentUser = data;
      this.isLoggedIn = (this.currentUser != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: any) => {
      console.log(data);
      this.currentUser = data;
      this.isLoggedIn = (this.currentUser != null);
      this.router.navigate(["/"]);
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data: any) => {
      console.log(data);
      this.currentUser = data;
      this.isLoggedIn = (this.currentUser != null);
      this.router.navigate(["/"]);
    });
  }

}
