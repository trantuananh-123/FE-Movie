import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { CountryService } from 'src/app/services/country.service';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-add-movie',
    templateUrl: './add-movie.component.html',
    styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

    addMovie!: FormGroup;
    countryList!: any;
    genreList!: any;

    constructor(private toastr: ToastrService, private fb: FormBuilder, private movieService: MovieService, private countryService: CountryService, private genreService: GenreService, private spinner: SpinnerService) { }

    ngOnInit(): void {
        this.spinner.hide();
        this.initForm();
        this.getAllCountry();
        this.getAllGenre();
    }

    getAllCountry() {
        this.countryService.getAll().subscribe((res: any) => {
            this.countryList = res.data;
        })
    }

    getAllGenre() {
        this.genreService.getAll().subscribe((res: any) => {
            this.genreList = res.data;
        });
    }

    initForm() {
        this.addMovie = this.fb.group({
            countryId: [null, Validators.required],
            title: [null, Validators.required],
            name: [null, Validators.required],
            releaseDate: [null, Validators.required],
            runtime: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
            overview: [null, Validators.required],
            trailerUrl: [null, Validators.required],
            posterUrl: [null, Validators.required],
            ageRestricted: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
            isActive: [null],
            createdDate: [null],
            genreId: [null, Validators.required],
            rate: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
        });
    }

    get form() {
        return this.addMovie.controls;
    }

    save() {
        console.log(this.addMovie.value);
        if (this.addMovie.valid) {
            this.movieService.save(this.addMovie.value).subscribe((res: any) => {
                this.spinner.show();
                console.log(res);
                this.toastr.success('Movie added successfully');
                this.addMovie.reset();
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);
            });
        } else {
            this.toastr.error('Please fill all the required fields');
        }
    }

}
