import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

    displayedColumns: string[] = ['code', 'name', 'createdDate', 'action'];

    addCountry!: FormGroup;
    countryList: any = [];

    constructor(private toastr: ToastrService, private fb: FormBuilder, private countryService: CountryService, private spinner: SpinnerService) { }

    ngOnInit(): void {
        this.initForm();
        this.getAll();
    }

    getAll() {
        this.countryService.getAll().subscribe((res: any) => {
            this.spinner.show();
            this.countryList = res.data;
            console.log(res);
            setTimeout(() => {
                this.spinner.hide();
            }, 1000);
        });
    }

    initForm() {
        this.addCountry = this.fb.group({
            id: [null, Validators.required],
            name: [null, Validators.required],
            isActive: [1, Validators.required],
            isDelete: [0, Validators.required],
            createdDate: [new Date(), Validators.required]
        });
    }

    get form() {
        return this.addCountry.controls;
    }

    save() {
        this.addCountry.patchValue({
            isActive: 1,
            isDelete: 0,
            createdDate: this.form.createdDate.value != null ? this.form.createdDate.value : new Date()
        })
        console.log(this.addCountry.value);
        if (this.addCountry.valid) {
            this.countryService.save(this.addCountry.value).subscribe((res: any) => {
                this.spinner.show();
                this.getAll();
                this.toastr.success('Contry added successfully');
                this.addCountry.reset();
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);
            });
        } else {
            this.toastr.error('Please fill all the required fields');
        }
    }

    edit(element: any) {
        this.addCountry.patchValue({
            id: element.id,
            name: element.name,
            isActive: element.isActive,
            isDelete: element.isDelete,
            createdDate: element.createdDate
        });
    }

    delete(element: any) {
        this.countryService.delete(element).subscribe((res: any) => {
            this.spinner.show();
            this.getAll();
            this.toastr.success('Contry deleted successfully');
            setTimeout(() => {
                this.spinner.hide();
            }, 1000);
        });
    }

}
