import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

    displayedColumns: string[] = ['name', 'createdDate', 'action'];

    addGenre!: FormGroup;
    genreList: any = [];

    constructor(private toastr: ToastrService, private fb: FormBuilder, private genreSevice: GenreService, private spinner: SpinnerService) { }

    ngOnInit(): void {
        this.initForm();
        this.getAll();
    }

    getAll() {
        this.genreSevice.getAll().subscribe((res: any) => {
            this.spinner.show();
            this.genreList = res.data;
            console.log(res);
            setTimeout(() => {
                this.spinner.hide();
            }, 1000);
        });
    }

    initForm() {
        this.addGenre = this.fb.group({
            id: [null],
            name: [null, Validators.required],
            isActive: [1, Validators.required],
            isDelete: [0, Validators.required],
            createdDate: [new Date(), Validators.required]
        });
    }

    get form() {
        return this.addGenre.controls;
    }

    save() {
        this.addGenre.patchValue({
            isActive: 1,
            isDelete: 0,
            createdDate: this.form.createdDate.value != null ? this.form.createdDate.value : new Date()
        })
        console.log(this.addGenre.value);
        if (this.addGenre.valid) {
            this.genreSevice.save(this.addGenre.value).subscribe((res: any) => {
                this.spinner.show();
                this.getAll();
                this.toastr.success('Genre added successfully');
                this.addGenre.reset();
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);
            });
        } else {
            this.toastr.error('Please fill all the required fields');
        }
    }

    edit(element: any) {
        this.addGenre.patchValue({
            id: element.id,
            name: element.name,
            isActive: element.isActive,
            isDelete: element.isDelete,
            createdDate: element.createdDate
        });
    }

    delete(element: any) {
        this.genreSevice.delete(element).subscribe((res: any) => {
            this.spinner.show();
            this.getAll();
            this.toastr.success('Genre deleted successfully');
            setTimeout(() => {
                this.spinner.hide();
            }, 1000);
        });
    }

}
