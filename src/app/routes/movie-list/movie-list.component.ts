import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

    movieList: any[] = [];
    genreList: any = [];
    countryList: any = [];

    searchForm!: FormGroup;

    constructor(private fb: FormBuilder, private movieService: MovieService, private genreService: GenreService, private countryService: CountryService) { }

    ngOnInit(): void {
        this.initForm();
        this.getAllMovie();
        this.getAllGenre();
        this.getAllCountry();
    }

    initForm() {
        this.searchForm = this.fb.group({
            genreId: [null],
            countryId: [null],
            rate: [null],
            releaseDate: [null]
        });
    }

    getAllMovie() {
        this.movieService.getAll().subscribe((data: any) => {
            this.movieList = data.data;
        });
    }

    getAllGenre() {
        this.genreService.getAll().subscribe((data: any) => {
            this.genreList = data.data;
        });
    }

    getAllCountry() {
        this.countryService.getAll().subscribe((data: any) => {
            this.countryList = data.data;
        });
    }

    formatLabel(value: number) {
        return value;
    }

    getRate(event: any) {
        this.searchForm.patchValue({
            rate: event.value
        })
    }

    search() {
        console.log(this.searchForm.value);
        this.movieService.search(this.searchForm.value).subscribe((data: any) => {
            this.movieList = data.data;
            console.log(data);
        });
    }

    paginationLimit: number = 7;
    startPage: number = 0;

    showMoreItems() {
        this.paginationLimit = this.paginationLimit + 2;

    }

    showLessItems() {
        this.paginationLimit = this.paginationLimit - 2;
    }
}
