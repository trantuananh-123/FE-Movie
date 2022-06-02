import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/authentication/auth-service.service';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

    verifyForm!: FormGroup;
    submitted: Boolean = false;


    constructor(private router: Router, private spinner: SpinnerService, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private tokenService: TokenStorageService) { }

    ngOnInit(): void {
        this.spinner.hide();
        this.initForm();
    }

    initForm(): void {
        this.verifyForm = this.fb.group({
            username: [null, Validators.required],
            verifyToken: [null, Validators.required]
        });
    }

    get form(): { [key: string]: AbstractControl; } {
        return this.verifyForm.controls;
    }

    verify() {
        const body = this.verifyForm.value;
        this.authService.verify(body).subscribe((data: any) => {
            this.toastr.success('Verify success', 'Success');
            this.router.navigate(['/login']);
        });
    }
}
