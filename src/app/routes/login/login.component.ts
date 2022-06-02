import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/authentication/auth-service.service';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    signInForm!: FormGroup;
    submitted: Boolean = false;

    socialUser!: SocialUser;
    currentUser!: SocialUser;
    isLoggedIn!: Boolean;

    constructor(private globalService: GlobalService, private socialAuthService: SocialAuthService, private router: Router, private spinner: SpinnerService, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private tokenService: TokenStorageService) { }

    ngOnInit(): void {
        this.spinner.hide();
        this.initForm();
    }

    initForm(): void {
        this.signInForm = this.fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    get signInFormControl(): { [key: string]: AbstractControl; } {
        return this.signInForm.controls;
    }

    signIn(): void {
        let roles: any = [];
        this.submitted = true;
        if (this.signInForm.valid) {
            this.spinner.show();
            const user = this.signInForm.value;
            this.authService.signIn(user.username, user.password).subscribe((data: any) => {
                console.log(data);
                if (data.status == 20000) {
                    this.tokenService.saveToken(data.data.accessToken);
                    this.tokenService.saveUser(data.data.user.id);
                    this.tokenService.saveUserName(data.data.user.username);
                    data.data.user.roles.forEach((element: any) => {
                        roles.push(element.name);
                    });
                    this.tokenService.saveUserRole(roles);
                    this.globalService.setUsername(data.data.username);
                    this.globalService.setAvatar('../../../assets/img/default_avatar.png');
                    this.globalService.setIsAdmin(this.tokenService.isAdmin());
                    this.router.navigateByUrl('/home');
                    this.spinner.hide();
                    this.toastr.success("Sign in successfully!", "Sign in");
                    this.router.navigate(["/"]);
                } else {
                    this.toastr.error("Sign in failed!", "Sign in");
                }
                this.spinner.hide();
            }, () => {
                this.toastr.error("Sign in failed!", "Sign in");
                this.spinner.hide();
            });
        } else {
            this.toastr.warning("Please fill all information correctly!", "Sign in");
        }
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: any) => {
            console.log(data);
            this.currentUser = data;
            console.log(data.photoUrl);
            this.globalService.setAvatar(data.photoUrl);
            this.tokenService.saveUserName(data.username);
            this.globalService.setUsername(data.username);
            // this.globalService.setIsLoggedIn(true);
            this.isLoggedIn = (this.currentUser != null);
            this.router.navigate(["/"]);
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
        });
    }

    signInWithFacebook(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data: any) => {
            console.log(data);
            this.currentUser = data;
            this.isLoggedIn = (this.currentUser != null);
            this.tokenService.saveUserName(data.username);
            this.globalService.setUsername(data.username);
            // this.globalService.setIsLoggedIn(true);
            this.router.navigate(["/"]);
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
        });
    }
}
