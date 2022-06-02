import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Genre } from 'src/app/core/model/genre';
import { Movie } from 'src/app/core/model/movie';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { GenreService } from 'src/app/services/genre.service';
import { LazyLoadService } from 'src/app/services/lazy-load.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {

    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        autoplay: true,
        nav: true,
        navText: ["<i class='icon ion-ios-arrow-round-back'></i>", "<i class='icon ion-ios-arrow-round-forward'></i>"],
        autoplaySpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
        autoHeight: true,
        autoWidth: true,
        autoplayHoverPause: true
    }

    ngAfterViewInit() {
        this.lazyService.load("assets/js/owl.carousel.min.js");
        this.lazyService.load("assets/js/main.js");
    }

    movieList: Movie[] = []
    movies: Movie[] = []
    newestMovie: Movie[] = []
    genreList: Genre[] = []

    selectedItem = 0;
    paginationLimit: number = 7;
    startPage: number = 0;

    constructor(private movieService: MovieService, private genreService: GenreService, private lazyService: LazyLoadService, private spinner: SpinnerService) { }

    ngOnInit(): void {
        this.getAllMovie();
        this.getAllGenre();
    }


    getAllMovie(): void {
        this.spinner.show();
        this.movieService.getAll().subscribe((data: any) => {
            this.movies = data.data;
            const currentDate = new Date();
            const previousDate = new Date().setMonth(currentDate.getMonth() - 2);
            this.newestMovie = this.movies.filter((movie: any) => {
                const releasesDate = new Date(movie.releaseDate).getTime();
                return releasesDate <= currentDate.getTime() && releasesDate >= previousDate;
            });
            this.getGenre(data.data[0]);
            console.log(this.newestMovie);
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
        });
    }

    getAllGenre(): void {
        this.spinner.show();
        this.genreService.getAll().subscribe((data: any) => {
            this.genreList = data.data;
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
        });
    }

    getGenre(genre: any) {
        this.spinner.show();
        this.movieService.getByGenre(genre).subscribe((data: any) => {
            this.movieList = data.data;
            this.spinner.hide();
        }, () => {
            this.spinner.hide();
        });
    }

    showMoreItems() {
        this.paginationLimit = this.paginationLimit + 2;

    }

    showLessItems() {
        this.paginationLimit = this.paginationLimit - 2;
    }

}
