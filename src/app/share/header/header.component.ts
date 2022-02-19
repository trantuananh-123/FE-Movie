import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    socialUser!: SocialUser;
    currentUser!: SocialUser;
    isLoggedIn!: Boolean;

    defaultAvatar: String = '../../../assets/img/default-avatar.png'

    constructor(private authService: SocialAuthService, private spinner: SpinnerService) { }

    ngOnInit(): void {
        this.spinner.show();
        this.authService.authState.subscribe((data: any) => {
            this.currentUser = data;
            this.isLoggedIn = (this.currentUser != null);
            this.spinner.hide();
        });
    }

    signOut(): void {
        this.spinner.show();
        this.authService.signOut().then((data: any) => {
            console.log(data);
            this.spinner.hide();
        });
    }

}
