import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    socialUser!: SocialUser;
    currentUser!: SocialUser;
    isLoggedIn!: any;

    defaultAvatar!: String;
    username!: any;
    isAdmin: boolean = false;

    constructor(private globalService: GlobalService, private authService: SocialAuthService, private spinner: SpinnerService, private router: Router, private tokenService: TokenStorageService) {
        this.globalService.setUsername(this.tokenService.getUserName());
        this.globalService.setIsAdmin(this.tokenService.isAdmin());
        this.globalService.setAvatar('../../../assets/img/default-avatar.png');
    }

    ngOnInit(): void {
        this.globalService.username.subscribe(username => {
            this.username = username;
        });
        this.globalService.isAdmin.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
        });
        this.globalService.avatar.subscribe(avatar => {
            this.defaultAvatar = avatar;
        });
    }

    signOut(): void {
        this.spinner.show();
        if (this.currentUser != null) {
            this.authService.signOut().then((data: any) => {
                this.router.navigate(["/login"]);
                this.spinner.hide();
            });
        } else {
            window.sessionStorage.clear();
            window.location.reload();
        }
    }

}
