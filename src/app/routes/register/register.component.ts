import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/authentication/auth-service.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { CustomValidatorsService } from 'src/app/core/validators/custom-validators.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    submitted: Boolean = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private spinner: SpinnerService, private router: Router, private customValidator: CustomValidatorsService) { }

    ngOnInit(): void {
        this.spinner.hide();
        this.initForm();
    }

    initForm(): void {
        this.registerForm = this.fb.group({
            username: [null, [Validators.required, Validators.min(6), Validators.max(20)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.compose([Validators.required, this.customValidator.passwordPatternValidator()])],
            confirmPassword: [null, [Validators.required]]
        });
    }

    get registerFormControl(): { [key: string]: AbstractControl; } {
        return this.registerForm.controls;
    }


    uniqueUsername(event: any): void {
        this.authService.existedUsername(event.target.value).subscribe((data: any) => {
            console.log(data);
            if (data.data == false) {
                this.registerForm.controls['username'].setErrors(null);
            } else {
                this.registerForm.controls['username'].setErrors({ existedUsername: true });
            }
        });
    }

    uniqueEmail(event: any): void {
        this.authService.existedEmail(event.target.value).subscribe((data: any) => {
            console.log(data);
            if (data.data == false) {
                this.registerForm.controls['email'].setErrors(null);
            } else {
                this.registerForm.controls['email'].setErrors({ existedEmail: true });
            }
        });
    }

    matchPassword(event: any): void {
        if (this.registerForm.controls['password'].value == this.registerForm.controls['confirmPassword'].value) {
            this.registerForm.controls['confirmPassword'].setErrors(null);
        } else {
            this.registerForm.controls['confirmPassword'].setErrors({ notMatch: true });
        }
    }

    signUp(): void {
        this.submitted = true;
        if (this.registerForm.valid) {
            this.spinner.show();
            console.log(this.registerForm.value);
            if (this.registerForm.valid) {
                this.authService.signUp(this.registerForm.value).subscribe((data: any) => {
                    console.log(data);
                    if (data.status = 20000) {
                        this.toastr.success("Sign up successfully!", "Sign up");
                        this.router.navigate(['/verify']);
                    } else {
                        this.toastr.error("Sign up failed!", "Sign up");
                    }
                    this.spinner.hide();
                }, () => {
                    this.toastr.error("Sign up failed!", "Sign up");
                    this.spinner.hide();
                });
            }
        } else {
            this.toastr.warning("Please fill all information correctly!", "Sign up");
        }
    }

}
